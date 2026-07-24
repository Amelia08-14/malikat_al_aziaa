import Image from "next/image";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1a0a2e 0%, #2d1155 40%, #1a0a2e 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-100px] left-[-60px] w-[360px] h-[360px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e879f9, transparent 70%)" }}
      />

      {/* Card */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full rounded-3xl px-8 py-12"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.45)",
        }}
      >
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="ملكة الأزياء"
            width={110}
            height={110}
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Brand name */}
        <h1 className="text-white text-3xl font-bold tracking-wide mb-2"
            style={{ fontFamily: "var(--font-cairo)" }}>
          ملكة الأزياء
        </h1>

        {/* Divider */}
        <div className="w-16 h-[2px] rounded-full my-4"
             style={{ background: "linear-gradient(90deg, #c084fc, #e879f9)" }} />

        {/* Coming soon badge */}
        <p className="text-purple-200 text-lg font-semibold mb-3"
           style={{ fontFamily: "var(--font-cairo)" }}>
          قريباً ✨
        </p>

        <p className="text-purple-100/70 text-sm leading-relaxed mb-10"
           style={{ fontFamily: "var(--font-cairo)" }}>
          نعمل على تجربة تسوق فريدة من نوعها.
          <br />
          ابقي على تواصل معنا!
        </p>

</div>

      {/* Bottom tag */}
      <p className="relative z-10 mt-8 text-purple-300/40 text-xs"
         style={{ fontFamily: "var(--font-cairo)" }}>
        © 2025 ملكة الأزياء
      </p>
    </main>
  );
}
