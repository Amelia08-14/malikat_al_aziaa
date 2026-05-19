"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface BodyStats {
  gender: "female" | "male";
  height: number;
  weight: number;
  age: number;
  chest: number;
  waist: number;
  hips: number;
}

const cToR = (cm: number) => (cm / 100) / (2 * Math.PI) * 1.22;

function buildDims(stats: BodyStats) {
  const s  = stats.height / 100;
  const sw = Math.max(40, stats.height - 100);
  const wF = Math.pow(stats.weight / sw, 0.38);

  const chR    = cToR(stats.chest);
  const wstR   = cToR(stats.waist);
  const hipR   = cToR(stats.hips);
  const shldrR = chR * 1.28;

  const neckR  = 0.037 * s;
  const headR  = 0.108 * s;
  const armR   = 0.022 * s * wF;
  const thighR = hipR  * 0.43 * Math.pow(wF, 0.25);
  const calfR  = thighR * 0.63;
  const footR  = calfR  * 0.74;

  const ankleY    = 0.070 * s;
  const kneeY     = 0.310 * s;
  const hipBotY   = 0.500 * s;
  const shoulderY = 0.860 * s;
  const neckBotY  = shoulderY;
  const neckTopY  = 0.910 * s;
  const headCY    = 0.952 * s;

  const torsoH = shoulderY - hipBotY;
  const tH     = torsoH;

  const torsoProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.010,          0),
    new THREE.Vector2(hipR * 0.82,   tH * 0.03),
    new THREE.Vector2(hipR * 1.06,   tH * 0.17),
    new THREE.Vector2(wstR,           tH * 0.38),
    new THREE.Vector2(chR  * 0.91,   tH * 0.55),
    new THREE.Vector2(chR,            tH * 0.67),
    new THREE.Vector2(chR  * 0.87,   tH * 0.79),
    new THREE.Vector2(shldrR * 0.63, tH * 0.90),
    new THREE.Vector2(neckR  * 1.55, tH * 0.97),
    new THREE.Vector2(neckR,          tH),
  ];

  const upperArmH = 0.175 * s;
  const lowerArmH = 0.155 * s;
  const armAngle  = 0.22;
  const armX0     = shldrR * 0.62;

  const armJoints = (side: number) => {
    const sx = side * armX0;
    const ex = sx + side * upperArmH * Math.sin(armAngle);
    const ey = shoulderY - upperArmH;
    const wx = ex + side * lowerArmH * Math.sin(armAngle * 0.5);
    const wy = ey - lowerArmH;
    return { sx, ex, ey, wx, wy };
  };

  const legSpreadX = hipR * 0.58;
  const groupY = -0.60 * s;

  return {
    s, chR, wstR, hipR, shldrR, neckR, headR, armR, thighR, calfR, footR,
    ankleY, kneeY, hipBotY, shoulderY, neckBotY, neckTopY, headCY,
    torsoH, torsoProfile,
    upperArmH, lowerArmH, armAngle, armX0, armJoints,
    legSpreadX, groupY,
  };
}

const cLen = (total: number, r: number) => Math.max(0.002, total - 2 * r);

// White plastic mannequin material — smooth, matte, store-style
const MAT = { color: "#f4f2ef", roughness: 0.10, metalness: 0.04 } as const;

function BodyMesh({ stats }: { stats: BodyStats }) {
  const d = useMemo(() => buildDims(stats), [
    stats.height, stats.weight, stats.chest, stats.waist, stats.hips,
  ]);

  const upperLegH = d.hipBotY - d.kneeY;
  const lowerLegH = d.kneeY   - d.ankleY;

  return (
    <group position={[0, d.groupY, 0]}>

      {/* Torso */}
      <mesh position={[0, d.hipBotY, 0]} scale={[1, 1, 0.70]} castShadow receiveShadow>
        <latheGeometry args={[d.torsoProfile, 56]} />
        <meshStandardMaterial {...MAT} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, (d.neckBotY + d.neckTopY) / 2, 0]} castShadow>
        <capsuleGeometry args={[d.neckR, cLen(d.neckTopY - d.neckBotY, d.neckR), 8, 16]} />
        <meshStandardMaterial {...MAT} />
      </mesh>

      {/* Head — slightly elongated (mannequin style) */}
      <mesh position={[0, d.headCY, 0]} scale={[1, 1.08, 0.94]} castShadow>
        <sphereGeometry args={[d.headR, 32, 32]} />
        <meshStandardMaterial {...MAT} />
      </mesh>

      {/* Arms */}
      {([-1, 1] as const).map(side => {
        const j = d.armJoints(side);
        const ua = side * d.armAngle;
        const fa = side * d.armAngle * 0.5;
        return (
          <group key={side}>
            <mesh
              position={[(j.sx + j.ex) / 2, (d.shoulderY + j.ey) / 2, 0]}
              rotation={[0, 0, ua]}
              castShadow
            >
              <capsuleGeometry args={[d.armR, cLen(d.upperArmH, d.armR), 8, 16]} />
              <meshStandardMaterial {...MAT} />
            </mesh>
            <mesh
              position={[(j.ex + j.wx) / 2, (j.ey + j.wy) / 2, 0]}
              rotation={[0, 0, fa]}
              castShadow
            >
              <capsuleGeometry args={[d.armR * 0.86, cLen(d.lowerArmH, d.armR * 0.86), 8, 16]} />
              <meshStandardMaterial {...MAT} />
            </mesh>
            {/* Hand */}
            <mesh position={[j.wx, j.wy, 0]} castShadow>
              <sphereGeometry args={[d.armR * 1.1, 16, 16]} />
              <meshStandardMaterial {...MAT} />
            </mesh>
          </group>
        );
      })}

      {/* Legs */}
      {([-1, 1] as const).map(side => {
        const lx = side * d.legSpreadX;
        return (
          <group key={side}>
            <mesh position={[lx, (d.hipBotY + d.kneeY) / 2, 0]} castShadow>
              <capsuleGeometry args={[d.thighR, cLen(upperLegH, d.thighR), 8, 16]} />
              <meshStandardMaterial {...MAT} />
            </mesh>
            <mesh position={[lx, (d.kneeY + d.ankleY) / 2, 0]} castShadow>
              <capsuleGeometry args={[d.calfR, cLen(lowerLegH, d.calfR), 8, 16]} />
              <meshStandardMaterial {...MAT} />
            </mesh>
            <mesh
              position={[lx, d.ankleY - d.footR * 0.6, d.footR * 1.1]}
              rotation={[-Math.PI / 2 + 0.32, 0, 0]}
              castShadow
            >
              <capsuleGeometry args={[d.footR * 0.60, d.footR * 2.2, 6, 14]} />
              <meshStandardMaterial {...MAT} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function Mannequin3D({ stats }: { stats: BodyStats }) {
  const floorY = -(stats.height / 100) * 0.60;

  return (
    <div
      className="w-full h-full min-h-[500px] cursor-move relative"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #f0eeec 100%)" }}
    >
      <Canvas shadows dpr={[1, 2]}>
        {/* Camera starts at slight 3/4 angle */}
        <PerspectiveCamera makeDefault position={[0.35, 0.05, 3.5]} fov={42} />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.65}
          minDistance={2.0}
          maxDistance={6.0}
          target={[0, 0.05, 0]}
          autoRotate
          autoRotateSpeed={0.45}
        />

        {/* Clean studio lighting */}
        <ambientLight intensity={0.80} />
        <directionalLight
          position={[2.5, 5, 3]} intensity={1.2} castShadow
          shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004}
        />
        <directionalLight position={[-3, 3, -1]} intensity={0.35} color="#e8f0ff" />
        <directionalLight position={[0, -1, 2]}  intensity={0.15} color="#ffffff" />

        <Environment preset="studio" />

        <BodyMesh stats={stats} />

        <ContactShadows
          resolution={512} scale={3.5} blur={3.2} opacity={0.28}
          position={[0, floorY, 0]}
        />
      </Canvas>

      {/* Logo watermark — bottom right */}
      <div className="absolute bottom-4 left-4 opacity-60 pointer-events-none select-none">
        <Image
          src="/logo.png"
          alt="ملكة الأزياء"
          width={52}
          height={52}
          className="object-contain"
        />
      </div>
    </div>
  );
}
