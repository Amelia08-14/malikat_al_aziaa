import Image from "next/image";
import Link from "next/link";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/malikat_alazya/",
    bg: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "https://snapchat.com/t/zC4tDL01",
    bg: "linear-gradient(135deg, #f7c600, #f5a623)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.002.068.064.208.142.23 1.104.322 2.384-.104 3.01-.507.19-.12.38-.144.49-.104.21.08.34.304.25.54-.23.62-.96 1.08-1.68 1.35-.18.065-.36.13-.54.18-.41.118-.74.213-.81.535-.04.178.06.38.23.533 1.48 1.408 2.64 3.68 3.05 5.87.07.357-.21.498-.51.504-.13 0-.28-.028-.44-.063-.56-.12-1.41-.303-2.73-.303a10.3 10.3 0 00-1.59.128c-.17.026-.33.06-.49.086-1.09.192-2.17.35-3.24.35-.88 0-1.52-.108-2.35-.35-.17-.05-.34-.082-.51-.11a10.35 10.35 0 00-1.59-.128c-1.32 0-2.17.183-2.73.303-.16.035-.31.063-.44.063-.3-.006-.58-.147-.51-.504.41-2.19 1.57-4.462 3.05-5.87.17-.153.27-.355.23-.533-.07-.322-.4-.417-.81-.535-.18-.05-.36-.115-.54-.18-.72-.27-1.45-.73-1.68-1.35-.09-.236.04-.46.25-.54.11-.04.3-.016.49.104.626.403 1.906.829 3.01.507.078-.022.14-.162.142-.23l-.03-.51c-.104-1.628-.23-3.654.3-4.847C7.859 1.069 11.216.793 12.206.793z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@malikat_alazya",
    bg: "linear-gradient(135deg, #010101, #69c9d0)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/971553054631",
    bg: "linear-gradient(135deg, #25d366, #128c7e)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

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
        className="relative z-10 flex flex-col items-center text-center max-w-sm w-full rounded-3xl px-8 py-12"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.45)",
        }}
      >
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="ملكة الأزياء"
            width={100}
            height={100}
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Brand name */}
        <h1
          className="text-white text-2xl font-bold mb-1"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          ملكة الأزياء
        </h1>

        {/* Divider */}
        <div
          className="w-14 h-[2px] rounded-full my-4"
          style={{ background: "linear-gradient(90deg, #c084fc, #e879f9)" }}
        />

        {/* Social + WhatsApp buttons */}
        <div className="flex flex-col gap-3 w-full mb-5">
          {SOCIAL.map(({ label, href, bg, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-2xl text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95"
              style={{
                background: bg,
                boxShadow: "0 3px 14px rgba(0,0,0,0.3)",
                fontFamily: "var(--font-cairo)",
              }}
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 mb-5" />

        {/* Fitting room CTA */}
        <Link
          href="/fitting-room"
          className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:scale-[1.03] active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.45)",
            fontFamily: "var(--font-cairo)",
          }}
        >
          <span className="text-xl">👗</span>
          غرفة القياس
        </Link>
      </div>

      <p
        className="relative z-10 mt-8 text-purple-300/40 text-xs"
        style={{ fontFamily: "var(--font-cairo)" }}
      >
        © 2026 ملكة الأزياء
      </p>
    </main>
  );
}
