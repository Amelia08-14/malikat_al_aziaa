"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ArrowRight, Check, Ruler, Info } from "lucide-react";
import clsx from "clsx";
import Mannequin3D from "./Mannequin3D";
import {
  Product,
  SizeName,
  calculateSize,
  getSizeDisplayLabel,
  getSizeNumber,
} from "@/data/sizeData";

interface BodyStats {
  height:   number;
  weight:   number;
  chest:    number;
  waist:    number;
  hips:     number;
  skinTone: string;
}

const SKIN_TONES = [
  "#f5d0b0", "#eac096", "#d4956a", "#c27843", "#8d5524", "#573315",
];

// Soft color ring per recommended size (used for the result card accent)
const SIZE_RING: Record<string, string> = {
  XS:    "border-violet-300 bg-violet-50  text-violet-800",
  S:     "border-blue-300   bg-blue-50    text-blue-800",
  M:     "border-emerald-300 bg-emerald-50 text-emerald-800",
  L:     "border-yellow-300 bg-yellow-50  text-yellow-800",
  XL:    "border-orange-300 bg-orange-50  text-orange-800",
  "2XL": "border-red-300    bg-red-50     text-red-800",
  "3XL": "border-pink-300   bg-pink-50    text-pink-800",
  "4XL": "border-rose-300   bg-rose-50    text-rose-800",
  "5XL": "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800",
  "6XL": "border-purple-300 bg-purple-50  text-purple-800",
};

interface Props {
  product: Product;
  onBack:  () => void;
}

export default function FittingRoom({ product, onBack }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [stats, setStats] = useState<BodyStats>({
    height: 165, weight: 65,
    chest: 90, waist: 70, hips: 95,
    skinTone: SKIN_TONES[0],
  });

  const update = (key: keyof BodyStats, val: number | string) =>
    setStats(prev => ({ ...prev, [key]: val }));

  const recommendedSize: SizeName = calculateSize(stats.height, stats.weight, product);
  const sizeNumber   = getSizeNumber(recommendedSize, product);
  const sizeLabel    = getSizeDisplayLabel(recommendedSize, product);
  const productMeas  = product.measurements[recommendedSize] ?? {};
  const stdWeight    = stats.height - 100;
  const deviation    = stats.weight - stdWeight;
  const ringClass    = SIZE_RING[recommendedSize] ?? "border-gray-200 bg-gray-50 text-gray-800";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-[family-name:var(--font-cairo)]">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* ── Branded header ────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-1 px-6 py-4 border-b border-gray-100 bg-white text-center">
          <Image src="/logo.png" alt="ملكة الأزياء" width={160} height={64} className="object-contain" />
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">غرفة القياس الذكية</p>
        </div>

        <div className="flex flex-col md:flex-row">

        {/* ── Left: Mannequin ──────────────────────────────────────── */}
        <div
          className="w-full md:w-1/2 relative flex items-center justify-center overflow-hidden min-h-[420px] md:min-h-[500px]"
          style={{ backgroundColor: "#f8f7f5" }}
        >
          <div className="w-full h-full min-h-[420px] md:min-h-[500px] relative">
            <Mannequin3D stats={{ gender: "female", age: 25, ...stats }} />

            {step === 3 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/96 px-6 py-4 rounded-2xl shadow-xl text-center border border-gray-100 pointer-events-none z-20 backdrop-blur-sm">
                <div className={`text-5xl font-black mb-0.5 ${ringClass.split(' ')[2]}`}>
                  {sizeNumber}
                </div>
                {sizeNumber !== sizeLabel && (
                  <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                    {sizeLabel}
                  </div>
                )}
                <div className="text-gray-400 text-xs mt-1">المقاس المقترح</div>
              </div>
            )}
          </div>

          {/* Skin tone — vertical strip on the right of the mannequin */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            {SKIN_TONES.map(tone => (
              <button
                key={tone}
                onClick={() => update("skinTone", tone)}
                className={clsx(
                  "w-8 h-8 rounded-full border-2 transition-all duration-150 hover:scale-110",
                  stats.skinTone === tone
                    ? "border-black scale-110 shadow-lg"
                    : "border-white/60 shadow"
                )}
                style={{ backgroundColor: tone }}
                aria-label={`لون البشرة ${tone}`}
              />
            ))}
          </div>

          {/* Product badge + logo — top left */}
          <div className="absolute top-4 left-4 flex items-center gap-2 opacity-90">
            <Image src="/logo.png" alt="ملكة الأزياء" width={36} height={36} className="object-contain" />
            <span className="bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm">
              {product.code}
            </span>
          </div>
        </div>

        {/* ── Right: Controls ──────────────────────────────────────── */}
        <div className="w-full md:w-1/2 p-8 flex flex-col" dir="rtl">
          <div className="flex-1">

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-gray-700 transition-colors"
                title="العودة للمنتجات"
              >
                <ArrowRight size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-800 flex-1 text-center">
                {step === 1 && "أدخلي طولك ووزنك"}
                {step === 2 && "اضبطي شكل المجسم"}
                {step === 3 && "مقاسك المناسب"}
              </h1>
            </div>

            {/* ── STEP 1: Height + Weight ── */}
            {step === 1 && (
              <div className="space-y-5">
                <p className="text-gray-400 text-sm text-center -mt-2 mb-4">
                  المقاس يُحسب من الطول والوزن بناءً على جدول المقاسات الرسمي
                </p>

                <NumberInput
                  label="الطول (سم)"
                  value={stats.height} min={140} max={200}
                  onChange={v => update("height", v)}
                />
                <NumberInput
                  label="الوزن (كغ)"
                  value={stats.weight} min={35} max={200}
                  onChange={v => update("weight", v)}
                />

                {/* Live size preview */}
                <div className={`mt-4 rounded-2xl border-2 p-5 text-center ${ringClass}`}>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">
                    المقاس المتوقع حالياً
                  </div>
                  <div className="text-4xl font-black">{sizeNumber}</div>
                  {sizeNumber !== sizeLabel && (
                    <div className="text-xs mt-0.5 opacity-60 font-semibold">{sizeLabel}</div>
                  )}
                  {deviation !== 0 && (
                    <div className="text-xs mt-2 opacity-50">
                      {deviation > 0
                        ? `وزنك أثقل بـ ${deviation} كغ من المعيار`
                        : `وزنك أخف بـ ${-deviation} كغ من المعيار`}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 2: Body fine-tune ── */}
            {step === 2 && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm text-center -mt-2">
                  اختيارية — عدلي لرؤية شكل المجسم بدقة أكبر
                </p>

                {[
                  { label: "الصدر", key: "chest" as const, min: 70, max: 130 },
                  { label: "الخصر", key: "waist" as const, min: 50, max: 120 },
                  { label: "الورك", key: "hips"  as const, min: 70, max: 140 },
                ].map(item => (
                  <div key={item.key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-500">{stats[item.key]} سم</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => update(item.key, Math.max(item.min, stats[item.key] - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-bold"
                      >−</button>
                      <input
                        type="range" min={item.min} max={item.max}
                        value={stats[item.key]}
                        onChange={e => update(item.key, Number(e.target.value))}
                        className="flex-1 accent-black"
                      />
                      <button
                        onClick={() => update(item.key, Math.min(item.max, stats[item.key] + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-bold"
                      >+</button>
                    </div>
                  </div>
                ))}

              </div>
            )}

            {/* ── STEP 3: Results ── */}
            {step === 3 && (
              <div className="space-y-5">
                {/* Main result card */}
                <div className={`rounded-2xl border-2 p-6 text-center ${ringClass}`}>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">
                    المقاس الأنسب لكِ
                  </div>
                  <div className="text-6xl font-black leading-none">{sizeNumber}</div>
                  {sizeNumber !== sizeLabel && (
                    <div className="text-sm mt-1 font-bold opacity-50">{sizeLabel}</div>
                  )}
                  <div className="text-xs mt-3 opacity-50">
                    طول {stats.height} سم · وزن {stats.weight} كغ
                  </div>
                </div>

                {/* Measurements table */}
                {Object.keys(productMeas).length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Ruler size={15} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        مقاسات المنتج — مقاس {sizeNumber}
                      </span>
                      <span className="text-xs text-gray-400">(نصف مسطح، سم)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {product.measurementDefs.map(def => {
                        const val = productMeas[def.key];
                        if (val === undefined) return null;
                        return (
                          <div key={def.key} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                            <div className="text-lg font-bold text-gray-900">{val}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{def.labelAr}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Full size table */}
                <SizeTable product={product} recommended={recommendedSize} />

                {product.note && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                    <Info size={13} />
                    {product.note}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => (s - 1) as 1 | 2 | 3)}
                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
              >
                السابق
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(s => (s + 1) as 1 | 2 | 3)}
                className="px-7 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 font-bold shadow-lg shadow-gray-200"
              >
                {step === 1 ? "تخصيص المجسم" : "عرض النتيجة"}
                <ChevronLeft size={18} />
              </button>
            ) : (
              <button
                onClick={onBack}
                className="px-7 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 font-bold"
              >
                <Check size={18} />
                منتج آخر
              </button>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-5">
            {([1, 2, 3] as const).map(s => (
              <div
                key={s}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300",
                  step === s ? "bg-gray-800 w-5" : "bg-gray-300 w-2"
                )}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function NumberInput({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  // Keep draft in sync when parent changes value via +/- buttons
  useEffect(() => { setDraft(String(value)); }, [value]);

  const commit = (raw: string) => {
    const n = parseInt(raw, 10);
    if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)));
    setDraft(String(value)); // reset to committed value
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xl font-bold transition-colors"
        >−</button>
        <input
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={e => commit(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
          className="flex-1 text-center text-lg font-bold p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
        />
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xl font-bold transition-colors"
        >+</button>
      </div>
    </div>
  );
}

function SizeTable({ product, recommended }: { product: Product; recommended: SizeName }) {
  const sizes = product.availableSizes;
  const defs  = product.measurementDefs;

  return (
    <div>
      <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
        <span>جدول المقاسات الكامل</span>
        <span className="text-gray-300">({product.code})</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-xs text-center">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-gray-500 font-semibold">المقاس</th>
              {defs.map(d => (
                <th key={d.key} className="py-2 px-3 text-gray-500 font-semibold whitespace-nowrap">
                  {d.labelAr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map(size => {
              const m     = product.measurements[size] ?? {};
              const isRec = size === recommended;
              const num   = getSizeNumber(size, product);
              const lbl   = getSizeDisplayLabel(size, product);
              return (
                <tr
                  key={size}
                  className={clsx(
                    "border-t border-gray-50 transition-colors",
                    isRec ? "bg-black text-white font-bold" : "hover:bg-gray-50"
                  )}
                >
                  <td className="py-2 px-3 font-bold">
                    <span>{num}</span>
                    {num !== lbl && (
                      <span className={clsx("mr-1 font-normal", isRec ? "text-gray-300" : "text-gray-400")}>
                        ({lbl})
                      </span>
                    )}
                    {isRec && <span className="mr-1 text-xs">✓</span>}
                  </td>
                  {defs.map(d => (
                    <td key={d.key} className="py-2 px-3">
                      {m[d.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">* القياسات بالسنتيمتر — نصف المقاس المسطح</p>
    </div>
  );
}
