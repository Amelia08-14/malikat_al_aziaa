"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FittingRoom from "@/components/FittingRoom";
import { Product } from "@/data/sizeData";

export default function Home() {
  const [selected, setSelected] = useState<Product | null>(null);

  if (selected) {
    return (
      <FittingRoom
        product={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return <ProductGrid onSelect={setSelected} />;
}
