"use client";

import React from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/data/sizeData";

const CATEGORY_COLORS: Record<string, string> = {
  'عباءة': 'bg-purple-50 border-purple-200 hover:border-purple-400',
  'جلباب': 'bg-blue-50   border-blue-200   hover:border-blue-400',
  'بشت':   'bg-amber-50  border-amber-200  hover:border-amber-400',
  'طقم':   'bg-rose-50   border-rose-200   hover:border-rose-400',
  'خمار':  'bg-green-50  border-green-200  hover:border-green-400',
  'شيلة':  'bg-gray-50   border-gray-200   hover:border-gray-400',
};

const CATEGORY_BADGE: Record<string, string> = {
  'عباءة': 'bg-purple-100 text-purple-700',
  'جلباب': 'bg-blue-100   text-blue-700',
  'بشت':   'bg-amber-100  text-amber-700',
  'طقم':   'bg-rose-100   text-rose-700',
  'خمار':  'bg-green-100  text-green-700',
  'شيلة':  'bg-gray-200   text-gray-700',
};

interface Props {
  onSelect: (product: Product) => void;
}

export default function ProductGrid({ onSelect }: Props) {
  const categories = [...new Set(PRODUCTS.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Image
            src="/logo-horizontal.png"
            alt="ملكة الأزياء"
            width={180}
            height={60}
            className="object-contain"
            priority
          />
          <div className="text-sm text-gray-500 hidden md:block">
            اختاري المنتج للحصول على مقاسك المناسب
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          غرفة القياس الذكية
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          اختاري رقم المنتج، أدخلي طولك ووزنك، وسنقترح عليك المقاس الأنسب
        </p>
      </section>

      {/* Products grid grouped by category */}
      <main className="max-w-6xl mx-auto px-6 pb-16 space-y-10">
        {categories.map(cat => {
          const catProducts = PRODUCTS.filter(p => p.category === cat);
          return (
            <div key={cat}>
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${CATEGORY_BADGE[cat] ?? 'bg-gray-100 text-gray-600'}`}>
                  {cat}
                </span>
                <span className="text-gray-400 text-sm font-normal">
                  {catProducts.length} منتج
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {catProducts.map(product => (
                  <ProductCard
                    key={product.code}
                    product={product}
                    onSelect={onSelect}
                    colorClass={CATEGORY_COLORS[product.category] ?? 'bg-gray-50 border-gray-200 hover:border-gray-400'}
                    badgeClass={CATEGORY_BADGE[product.category] ?? 'bg-gray-100 text-gray-600'}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        ملكة الأزياء &copy; {new Date().getFullYear()} — جميع الحقوق محفوظة
      </footer>
    </div>
  );
}

function ProductCard({
  product,
  onSelect,
  colorClass,
  badgeClass,
}: {
  product: Product;
  onSelect: (p: Product) => void;
  colorClass: string;
  badgeClass: string;
}) {
  const minSize = product.availableSizes[0];
  const maxSize = product.availableSizes[product.availableSizes.length - 1];

  return (
    <button
      onClick={() => onSelect(product)}
      className={`
        group relative flex flex-col items-center gap-3 p-5
        rounded-2xl border-2 transition-all duration-200
        cursor-pointer text-center shadow-sm hover:shadow-md
        active:scale-95
        ${colorClass}
      `}
    >
      {/* Icon */}
      <div className="text-4xl">{product.categoryIcon}</div>

      {/* Code */}
      <div>
        <div className="text-xl font-bold text-gray-900 tracking-wide">
          {product.code}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{product.nameAr}</div>
      </div>

      {/* Size range badge */}
      <div className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeClass}`}>
        {product.note ? product.note : `${minSize} → ${maxSize}`}
      </div>

      {/* Arrow on hover */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-gray-400 text-lg">←</span>
      </div>
    </button>
  );
}
