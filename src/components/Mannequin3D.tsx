"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface BodyStats {
  gender:    "female" | "male";
  height:    number;
  weight:    number;
  age:       number;
  chest:     number;
  waist:     number;
  hips:      number;
  skinTone?: string; // hex colour — applied as multiply tint over the mannequin
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

// Body that the mannequin PNG represents
const REF = { chest: 102, waist: 86, hips: 112, height: 165 };

// Gaussian bell — influence weight centred on a body zone
const G = (t: number, c: number, w: number) => { const x = (t - c) / w; return Math.exp(-(x * x)); };

/**
 * Returns the horizontal scale factor at normalised row t (0 = top, 1 = bottom).
 *
 * Anatomy zones (calibrated on the plus-size 3/4-view PNG):
 *   t ≈ 0.00–0.19  head / neck / shoulders  → always 1.0  (hard cut-off)
 *   t ≈ 0.29        bust peak
 *   t ≈ 0.43        waist (narrowest point)
 *   t ≈ 0.59        widest hip / belly
 *   t ≈ 0.74        upper thigh             → partial hip effect
 *   t ≈ 1.00        ankles / feet           → always 1.0
 *
 * Each zone's influence is a gaussian so deformations blend smoothly with no sharp seams.
 */
function scaleAt(t: number, sC: number, sW: number, sH: number): number {
  // Everything above the armpits is anatomically fixed
  if (t < 0.19) return 1.0;

  // Shoulder anchor — narrow gaussian that fades the fixed region into the body below
  const wSh = G(t, 0.19, 0.030);
  // Bust (breasts only)
  const wBu = G(t, 0.29, 0.065);
  // Waist
  const wWa = G(t, 0.43, 0.048);
  // Hips / belly
  const wHi = G(t, 0.59, 0.068);
  // Upper thighs — half the hip influence
  const wTh = G(t, 0.74, 0.058);
  // Feet anchor (returns to 1.0)
  const wFt = G(t, 1.00, 0.048);

  const sMid  = (sH + 1.0) / 2; // thigh target = midpoint between hip scale and 1
  const total = wSh + wBu + wWa + wHi + wTh + wFt;
  if (total < 1e-6) return 1.0;

  return (
    wSh * 1.0  +
    wBu * sC   +
    wWa * sW   +
    wHi * sH   +
    wTh * sMid +
    wFt * 1.0
  ) / total;
}

function draw(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  sC: number,
  sW: number,
  sH: number,
  skinTone = "#f5f3f0",
) {
  const dpr  = window.devicePixelRatio || 1;
  const cssW = canvas.offsetWidth;
  const cssH = canvas.offsetHeight;
  if (cssW === 0 || cssH === 0) return;

  canvas.width  = cssW * dpr;
  canvas.height = cssH * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);

  const STRIPS = 400;
  // Deformation expands/contracts from the visual spine (~47 % from left in this PNG)
  const PIVOT = 0.47;
  const MAX_BODY_SCALE = Math.max(sC, sW, sH, 1);
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const maxFrameW = cssW * 0.82 / MAX_BODY_SCALE;
  const maxFrameH = cssH * 0.92;
  const frameH = Math.min(maxFrameH, maxFrameW / imageRatio);
  const frameW = frameH * imageRatio;
  const frameX = (cssW - frameW) / 2;
  const frameY = cssH - frameH - Math.max(10, cssH * 0.035);

  for (let i = 0; i < STRIPS; i++) {
    const t0    = i       / STRIPS;
    const t1    = (i + 1) / STRIPS;
    const scale = scaleAt(t0, sC, sW, sH);

    const srcY = t0 * img.naturalHeight;
    const srcH = (t1 - t0) * img.naturalHeight;

    const dstH = (t1 - t0) * frameH + 1; // +1 prevents sub-pixel gaps between strips
    const dstY = frameY + t0 * frameH;
    const dstW = frameW * scale;
    const dstX = frameX + frameW * PIVOT - dstW * PIVOT; // pivot around spine, not image centre

    ctx.drawImage(img, 0, srcY, img.naturalWidth, srcH, dstX, dstY, dstW, dstH);
  }

  // Apply skin-tone tint only to mannequin-body pixels — skip near-white background
  if (skinTone !== "#f5f3f0") {
    const [tr, tg, tb] = hexToRgb(skinTone);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 10) continue;                                    // transparent
      if (d[i] > 244 && d[i + 1] > 244 && d[i + 2] > 244) continue; // white bg
      d[i]     = (d[i]     * tr) >> 8;
      d[i + 1] = (d[i + 1] * tg) >> 8;
      d[i + 2] = (d[i + 2] * tb) >> 8;
    }
    ctx.putImageData(imgData, 0, 0);
  }
}

export default function Mannequin3D({ stats }: { stats: BodyStats }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef    = useRef<HTMLImageElement | null>(null);

  const sC   = clamp(stats.chest  / REF.chest,  0.68, 1.36);
  const sW   = clamp(stats.waist  / REF.waist,  0.64, 1.40);
  const sH   = clamp(stats.hips   / REF.hips,   0.68, 1.36);
  const sY   = clamp(stats.height / REF.height, 0.86, 1.14);
  const tone = stats.skinTone ?? "#f5f3f0";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const redraw = () => {
      const img = imgRef.current;
      if (img?.complete && img.naturalWidth > 0) draw(canvas, img, sC, sW, sH, tone);
    };

    if (!imgRef.current) {
      const img = new window.Image();
      img.src    = "/mannequin.png";
      img.onload = redraw;
      imgRef.current = img;
    } else {
      redraw();
    }
  }, [sC, sW, sH, tone]);

  // Redraw on container resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const img = imgRef.current;
      if (img?.complete) draw(canvas, img, sC, sW, sH, tone);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full h-full min-h-[420px] md:min-h-[500px] relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #f5f4f2 100%)" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display:         "block",
          transform:       `scaleY(${sY.toFixed(3)})`,
          transformOrigin: "bottom center",
          transition:      "transform 0.30s ease-out",
        }}
      />

      {/* Watermark is outside the canvas — never warps */}
      <div className="absolute bottom-4 left-4 pointer-events-none select-none z-10">
        <div className="bg-gray-800/80 rounded-xl p-2 backdrop-blur-sm">
          <Image src="/logo.png" alt="ملكة الأزياء" width={40} height={40} className="object-contain" />
        </div>
      </div>
    </div>
  );
}
