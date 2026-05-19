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
          <div className="rounded-[8px] bg-[#2f2522] px-5 py-3 shadow-sm">
            <Image
              src="/logo-horizontal.png"
              alt="ملكة الأزياء"
              width={210}
              height={72}
              className="h-auto w-44 object-contain sm:w-48"
              priority
            />
          </div>
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
