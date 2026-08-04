"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpLeft, Sparkles } from "lucide-react";
import { PRODUCTS, Product, getSizeNumber } from "@/data/sizeData";

interface Props {
  onSelect: (product: Product) => void;
}

export default function ProductGrid({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-stone-950" dir="rtl">
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-5 py-5 text-center">
          <Image
            src="/logo.png"
            alt="ملكة الأزياء"
            width={180}
            height={80}
            className="h-auto w-40 object-contain sm:w-48"
            priority
          />
          <h1 className="text-base font-black text-stone-950">
            غرفة القياس الذكية
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
            <Sparkles size={16} />
            <span>{PRODUCTS.length} منتجات متوفرة</span>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-end gap-6 px-5 pb-8 pt-8 md:grid-cols-[0.9fr_1.1fr] md:pt-12">
          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.22em] text-[#9b6a4a]">
              MALIKAT AL AZIAA
            </p>
            <h2 className="max-w-2xl text-3xl font-black leading-tight text-stone-950 sm:text-4xl lg:text-[42px]">
              اختاري منتجك وشوفي المقاس المناسب لك مباشرة
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-stone-600 md:justify-self-end">
            كل منتج مربوط بصورته ومرجعه. اضغطي على المنتج، أدخلي الطول والوزن،
            وستظهر لك نتيجة المقاس حسب جدول القياسات الرسمي.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-stone-950">المنتجات</h2>
              <p className="mt-1 text-sm text-stone-500">اختاري المرجع المطلوب</p>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-700 shadow-sm ring-1 ring-stone-200">
              مشد
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.code}
                product={product}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-stone-200 bg-white">

        {/* WhatsApp CTA banner */}
        <div className="bg-[#f8f3ef] px-5 py-8 text-center" dir="rtl">
          <p className="text-lg font-black text-stone-900 mb-1">جاهزة تطلبي؟</p>
          <p className="text-sm text-stone-500 mb-4">الواتساب متاح لتأكيد المقاس وإتمام الطلب</p>
          <a
            href="https://wa.me/971553054631"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#1ebe5d] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.508 5.825L.057 23.5l5.83-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.031-1.37l-.361-.214-3.741.981.998-3.648-.235-.374A9.862 9.862 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/></svg>
            971+ 55 305 4631
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 py-5 flex-wrap px-4">
          {/* WhatsApp */}
          <a href="https://wa.me/971553054631" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-stone-500 hover:text-[#25D366] transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.508 5.825L.057 23.5l5.83-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.031-1.37l-.361-.214-3.741.981.998-3.648-.235-.374A9.862 9.862 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/></svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com/malikat_alazya?igshid=1pchknqlo11pe" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-stone-500 hover:text-[#E1306C] transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@malikat_alazya?_r=1&_t=ZS-96W7RGTsYwT" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-stone-500 hover:text-stone-900 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/></svg>
          </a>
          {/* Snapchat */}
          <a href="https://snapchat.com/t/zC4tDL01" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className="transition-opacity hover:opacity-70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/snapchat-logo.svg" alt="Snapchat" width={24} height={24} />
          </a>
        </div>

        {/* Tabby / Tamara */}
        <div className="flex items-center justify-center gap-4 pb-5">
          <span className="text-xs font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">tabby</span>
          <span className="text-xs font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">tamara</span>
        </div>

        <p className="text-center text-xs text-stone-400 pb-5">
          © {new Date().getFullYear()} Malikat Al Azya — جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  const minSize = product.availableSizes[0];
  const maxSize = product.availableSizes[product.availableSizes.length - 1];
  const minNum = getSizeNumber(minSize, product);
  const maxNum = getSizeNumber(maxSize, product);
  const imageSrc = `/images_produit/${product.code}.png`;

  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="group overflow-hidden rounded-[8px] bg-white text-right shadow-sm ring-1 ring-stone-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={imageSrc}
          alt={`${product.nameAr} - ${product.code}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain object-center"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-stone-900 shadow-sm">
          Ref {product.code}
        </span>
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-950 shadow-sm transition group-hover:bg-stone-950 group-hover:text-white">
          <ArrowUpLeft size={18} />
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-black leading-7 text-stone-950">
          {product.nameAr}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-stone-500">
            المقاسات
          </span>
          <span className="rounded-full bg-[#f7f3ef] px-3 py-1 text-sm font-black text-stone-800">
            {product.note ? product.note : `${minNum} - ${maxNum}`}
          </span>
        </div>
      </div>
    </button>
  );
}
