// Size calculation logic encoded from client's Excel files
// "size malikat alazya.xlsx" + "__جدول المقاسات_.xlsx"
//
// Algorithm:
//   standard_weight = height - 100
//   base_size = lookup by height (per product group)
//   deviation = actual_weight - standard_weight
//   if excess  → apply upward  adjustment rules → go up in size
//   if deficit → apply downward adjustment rules → go down in size

export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'] as const;
export type SizeName = typeof ALL_SIZES[number];

// Numeric labels communicated to customers (avoid intimidating XL labels)
export const SIZE_NUMBERS: Record<SizeName, string> = {
  XS: '30', S: '32', M: '34', L: '36', XL: '38',
  '2XL': '40', '3XL': '42', '4XL': '44', '5XL': '46', '6XL': '48',
};

export function getSizeNumber(size: SizeName, product?: Product): string {
  if (product?.code === '1010') return size === 'S' ? '32 / 34' : '36 / 38';
  return SIZE_NUMBERS[size] ?? size;
}

interface HeightRange { maxHeight: number; size: SizeName; }
interface AdjRule    { maxDeviation: number; steps: number; }

interface SizeGroup {
  heightRanges: HeightRange[];
  upwardAdjustments: AdjRule[];
  downwardAdjustments: AdjRule[];
}

// ─── Size Groups ──────────────────────────────────────────────────────────────

// Tab "781 782 795 704 706 672"
// H≤157=M · H≤166=L · H≤174=XL · H≤183=2XL · H≤190=3XL
const GROUP_MAIN: SizeGroup = {
  heightRanges: [
    { maxHeight: 157, size: 'M'   },
    { maxHeight: 166, size: 'L'   },
    { maxHeight: 174, size: 'XL'  },
    { maxHeight: 183, size: '2XL' },
    { maxHeight: 190, size: '3XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 9,        steps: 0 },
    { maxDeviation: 14,       steps: 1 },
    { maxDeviation: 19,       steps: 2 },
    { maxDeviation: 26,       steps: 3 },
    { maxDeviation: 29,       steps: 4 },
    { maxDeviation: 38,       steps: 5 },
    { maxDeviation: 49,       steps: 6 },
    { maxDeviation: Infinity, steps: 7 },
  ],
  downwardAdjustments: [
    { maxDeviation: 3,        steps: 0 },
    { maxDeviation: 8,        steps: 1 },
    { maxDeviation: 11,       steps: 2 },
    { maxDeviation: 13,       steps: 3 },
    { maxDeviation: Infinity, steps: 4 },
  ],
};

// Tab "752" — H≤159=S · H≤174=M · H≤183=L · H≤190=XL
const GROUP_752: SizeGroup = {
  heightRanges: [
    { maxHeight: 159, size: 'S'  },
    { maxHeight: 174, size: 'M'  },
    { maxHeight: 183, size: 'L'  },
    { maxHeight: 190, size: 'XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 8,        steps: 0 },
    { maxDeviation: 19,       steps: 1 },
    { maxDeviation: 27,       steps: 2 },
    { maxDeviation: 35,       steps: 3 },
    { maxDeviation: 38,       steps: 4 },
    { maxDeviation: 44,       steps: 5 },
    { maxDeviation: Infinity, steps: 6 },
  ],
  downwardAdjustments: [
    { maxDeviation: 9,        steps: 0 },
    { maxDeviation: Infinity, steps: 1 },
  ],
};

// Tab "754-1" — H≤159=S · H≤169=M · H≤183=L · H≤190=XL
const GROUP_754: SizeGroup = {
  heightRanges: [
    { maxHeight: 159, size: 'S'  },
    { maxHeight: 169, size: 'M'  },
    { maxHeight: 183, size: 'L'  },
    { maxHeight: 190, size: 'XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 7,        steps: 0 },
    { maxDeviation: 12,       steps: 1 },
    { maxDeviation: 20,       steps: 2 },
    { maxDeviation: 29,       steps: 3 },
    { maxDeviation: 39,       steps: 4 },
    { maxDeviation: Infinity, steps: 5 },
  ],
  downwardAdjustments: [
    { maxDeviation: 5,        steps: 0 },
    { maxDeviation: Infinity, steps: 1 },
  ],
};

// Tab "787" — H≤154=XS · H≤165=S · H≤176=M · H≤183=L · H≤190=XL
const GROUP_787: SizeGroup = {
  heightRanges: [
    { maxHeight: 154, size: 'XS' },
    { maxHeight: 165, size: 'S'  },
    { maxHeight: 176, size: 'M'  },
    { maxHeight: 183, size: 'L'  },
    { maxHeight: 190, size: 'XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 4,        steps: 0 },
    { maxDeviation: 15,       steps: 1 },
    { maxDeviation: 21,       steps: 2 },
    { maxDeviation: 30,       steps: 3 },
    { maxDeviation: 36,       steps: 4 },
    { maxDeviation: 44,       steps: 5 },
    { maxDeviation: 45,       steps: 6 },
    { maxDeviation: Infinity, steps: 7 },
  ],
  downwardAdjustments: [
    { maxDeviation: 5,        steps: 0 },
    { maxDeviation: Infinity, steps: 1 },
  ],
};

// Tab "789" — H≤159=S · H≤174=M · H≤183=L · H≤190=XL
const GROUP_789: SizeGroup = {
  heightRanges: [
    { maxHeight: 159, size: 'S'  },
    { maxHeight: 174, size: 'M'  },
    { maxHeight: 183, size: 'L'  },
    { maxHeight: 190, size: 'XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 11,       steps: 0 },
    { maxDeviation: 21,       steps: 1 },
    { maxDeviation: 30,       steps: 2 },
    { maxDeviation: 36,       steps: 3 },
    { maxDeviation: 44,       steps: 4 },
    { maxDeviation: 54,       steps: 5 },
    { maxDeviation: Infinity, steps: 6 },
  ],
  downwardAdjustments: [
    { maxDeviation: Infinity, steps: 1 },
  ],
};

// Tab "811" — H≤169=XS · H≤179=S · H≤190=M · H≤195=L · H≤205=XL · H≤211=2XL
const GROUP_811: SizeGroup = {
  heightRanges: [
    { maxHeight: 169, size: 'XS'  },
    { maxHeight: 179, size: 'S'   },
    { maxHeight: 190, size: 'M'   },
    { maxHeight: 195, size: 'L'   },
    { maxHeight: 205, size: 'XL'  },
    { maxHeight: 211, size: '2XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 9,        steps: 0 },
    { maxDeviation: 15,       steps: 1 },
    { maxDeviation: 25,       steps: 2 },
    { maxDeviation: 30,       steps: 3 },
    { maxDeviation: 40,       steps: 4 },
    { maxDeviation: Infinity, steps: 5 },
  ],
  downwardAdjustments: [
    { maxDeviation: 9,        steps: 0 },
    { maxDeviation: Infinity, steps: 1 },
  ],
};

// Tab "670" — H≤169=S · H≤179=M · H≤189=L · H≤190=XL
const GROUP_670: SizeGroup = {
  heightRanges: [
    { maxHeight: 169, size: 'S'  },
    { maxHeight: 179, size: 'M'  },
    { maxHeight: 189, size: 'L'  },
    { maxHeight: 190, size: 'XL' },
  ],
  upwardAdjustments: [
    { maxDeviation: 6,        steps: 0 },
    { maxDeviation: 9,        steps: 1 },
    { maxDeviation: 20,       steps: 2 },
    { maxDeviation: 30,       steps: 3 },
    { maxDeviation: Infinity, steps: 4 },
  ],
  downwardAdjustments: [
    { maxDeviation: 9,        steps: 0 },
    { maxDeviation: Infinity, steps: 1 },
  ],
};

// ─── Calculation ──────────────────────────────────────────────────────────────

function getBaseSize(height: number, group: SizeGroup): SizeName {
  for (const range of group.heightRanges) {
    if (height <= range.maxHeight) return range.size;
  }
  return group.heightRanges[group.heightRanges.length - 1].size;
}

function applyAdjustment(deviation: number, rules: AdjRule[]): number {
  for (const rule of rules) {
    if (deviation <= rule.maxDeviation) return rule.steps;
  }
  return rules[rules.length - 1].steps;
}

// ─── Measurement Types ────────────────────────────────────────────────────────

export interface MeasurementDef {
  key:     string;
  labelAr: string;
  labelEn: string;
}

// ─── Product Type ─────────────────────────────────────────────────────────────

export interface Product {
  code:            string;
  nameAr:          string;
  category:        string;
  categoryIcon:    string;
  sizeGroup:       SizeGroup;
  availableSizes:  SizeName[];
  measurementDefs: MeasurementDef[];
  measurements:    Partial<Record<SizeName, Record<string, number>>>;
  note?:           string;
  customCalculate?: (height: number, weight: number) => SizeName;
  bodySliders?:    Array<'chest' | 'waist' | 'hips' | 'arms'>;
  gender?:         'female' | 'male';
  isFaceProduct?:  boolean;
}

export function calculateSize(height: number, weight: number, product: Product): SizeName {
  if (product.customCalculate) return product.customCalculate(height, weight);

  const { sizeGroup, availableSizes } = product;
  const standardWeight = height - 100;
  const deviation = weight - standardWeight;

  const baseSize    = getBaseSize(height, sizeGroup);
  const baseSizeIdx = ALL_SIZES.indexOf(baseSize);

  let steps = 0;
  if (deviation > 0) {
    steps = applyAdjustment(deviation, sizeGroup.upwardAdjustments);
  } else if (deviation < 0) {
    steps = -applyAdjustment(-deviation, sizeGroup.downwardAdjustments);
  }

  const rawIdx   = baseSizeIdx + steps;
  const minIdx   = Math.min(...availableSizes.map(s => ALL_SIZES.indexOf(s)));
  const maxIdx   = Math.max(...availableSizes.map(s => ALL_SIZES.indexOf(s)));
  const finalIdx = Math.max(minIdx, Math.min(maxIdx, rawIdx));
  return ALL_SIZES[finalIdx];
}

export function getSizeDisplayLabel(size: SizeName, product: Product): string {
  if (product.code === '1010') return size === 'S' ? 'S / M' : 'L / XL';
  return size;
}

export function getProductByCode(code: string): Product | undefined {
  return PRODUCTS.find(p => p.code === code);
}

// ─── Products Catalogue ───────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [

  // ── 781 ──────────────────────────────────────────────────────────────────
  {
    code: '781',
    nameAr: 'مشد 781',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_MAIN,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL','6XL'],
    measurementDefs: [
      { key: 'waist',  labelAr: 'الخصر', labelEn: 'Waist(CM)'  },
      { key: 'hips',   labelAr: 'الورك',  labelEn: 'Hips(CM)'   },
      { key: 'thighs', labelAr: 'الفخذ',  labelEn: 'Thighs(CM)' },
    ],
    measurements: {
      S:    { waist: 24, hips: 35, thighs: 22 },
      M:    { waist: 26, hips: 37, thighs: 24 },
      L:    { waist: 28, hips: 37, thighs: 26 },
      XL:   { waist: 30, hips: 38, thighs: 28 },
      '2XL':{ waist: 32, hips: 39, thighs: 30 },
      '3XL':{ waist: 34, hips: 40, thighs: 32 },
      '4XL':{ waist: 36, hips: 42, thighs: 34 },
      '5XL':{ waist: 38, hips: 44, thighs: 36 },
      '6XL':{ waist: 40, hips: 46, thighs: 38 },
    },
  },

  // ── 782 ──────────────────────────────────────────────────────────────────
  {
    code: '782',
    nameAr: 'مشد 782',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_MAIN,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL','6XL'],
    measurementDefs: [
      { key: 'waist',  labelAr: 'الخصر', labelEn: 'Waist(CM)'  },
      { key: 'hips',   labelAr: 'الورك',  labelEn: 'Hips(CM)'   },
      { key: 'thighs', labelAr: 'الفخذ',  labelEn: 'Thighs(CM)' },
    ],
    measurements: {
      S:    { waist: 24, hips: 35, thighs: 22 },
      M:    { waist: 26, hips: 37, thighs: 24 },
      L:    { waist: 28, hips: 37, thighs: 26 },
      XL:   { waist: 30, hips: 38, thighs: 28 },
      '2XL':{ waist: 32, hips: 39, thighs: 30 },
      '3XL':{ waist: 34, hips: 40, thighs: 32 },
      '4XL':{ waist: 36, hips: 42, thighs: 34 },
      '5XL':{ waist: 38, hips: 44, thighs: 36 },
      '6XL':{ waist: 40, hips: 46, thighs: 38 },
    },
  },

  // ── 795 ──────────────────────────────────────────────────────────────────
  {
    code: '795',
    nameAr: 'مشد 795',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_MAIN,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL'],
    measurementDefs: [
      { key: 'waist',     labelAr: 'الخصر',          labelEn: 'Waist(CM)'             },
      { key: 'hips',      labelAr: 'الورك',           labelEn: 'Hips(CM)'              },
      { key: 'thighs',    labelAr: 'الفخذ',           labelEn: 'Thighs(CM)'            },
      { key: 'lchest',    labelAr: 'الصدر السفلي',    labelEn: '(CM)Lower Chest'       },
      { key: 'shoulders', labelAr: 'بين الأكتاف',     labelEn: 'Between Shoulders(CM)' },
      { key: 'arms',      labelAr: 'الأكمام',         labelEn: 'Arms(CM)'              },
    ],
    measurements: {
      S:    { waist: 24, hips: 33, thighs: 21, lchest: 30, shoulders: 31, arms: 13 },
      M:    { waist: 26, hips: 35, thighs: 23, lchest: 32, shoulders: 32, arms: 13 },
      L:    { waist: 28, hips: 38, thighs: 25, lchest: 34, shoulders: 34, arms: 15 },
      XL:   { waist: 30, hips: 40, thighs: 28, lchest: 36, shoulders: 35, arms: 15 },
      '2XL':{ waist: 32, hips: 42, thighs: 30, lchest: 38, shoulders: 37, arms: 16 },
      '3XL':{ waist: 34, hips: 44, thighs: 32, lchest: 40, shoulders: 39, arms: 16 },
      '4XL':{ waist: 36, hips: 46, thighs: 34, lchest: 42, shoulders: 41, arms: 17 },
      '5XL':{ waist: 38, hips: 48, thighs: 36, lchest: 44, shoulders: 44, arms: 17 },
    },
  },

  // ── 704 ──────────────────────────────────────────────────────────────────
  {
    code: '704',
    nameAr: 'مشد 704',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_MAIN,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL'],
    measurementDefs: [
      { key: 'waist',  labelAr: 'الخصر', labelEn: 'Waist(CM)'  },
      { key: 'hips',   labelAr: 'الورك',  labelEn: 'Hips(CM)'   },
      { key: 'thighs', labelAr: 'الفخذ',  labelEn: 'Thighs(CM)' },
    ],
    measurements: {
      S:    { waist: 28, hips: 38, thighs: 22 },
      M:    { waist: 30, hips: 40, thighs: 24 },
      L:    { waist: 32, hips: 42, thighs: 26 },
      XL:   { waist: 34, hips: 42, thighs: 26 },
      '2XL':{ waist: 36, hips: 44, thighs: 27 },
      '3XL':{ waist: 38, hips: 45, thighs: 28 },
      '4XL':{ waist: 40, hips: 46, thighs: 29 },
      '5XL':{ waist: 42, hips: 48, thighs: 30 },
    },
  },

  // ── 706 ──────────────────────────────────────────────────────────────────
  {
    code: '706',
    nameAr: 'مشد 706',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_MAIN,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL'],
    measurementDefs: [
      { key: 'waist',  labelAr: 'الخصر', labelEn: 'Waist(CM)'  },
      { key: 'hips',   labelAr: 'الورك',  labelEn: 'Hips(CM)'   },
      { key: 'thighs', labelAr: 'الفخذ',  labelEn: 'Thighs(CM)' },
    ],
    measurements: {
      S:    { waist: 28, hips: 38, thighs: 22 },
      M:    { waist: 30, hips: 40, thighs: 24 },
      L:    { waist: 32, hips: 42, thighs: 26 },
      XL:   { waist: 34, hips: 42, thighs: 26 },
      '2XL':{ waist: 36, hips: 44, thighs: 27 },
      '3XL':{ waist: 38, hips: 45, thighs: 28 },
      '4XL':{ waist: 40, hips: 46, thighs: 29 },
      '5XL':{ waist: 42, hips: 48, thighs: 30 },
    },
  },

  // ── 672 ──────────────────────────────────────────────────────────────────
  {
    code: '672',
    nameAr: 'مشد 672',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_MAIN,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL'],
    bodySliders: ['chest', 'waist', 'arms'],
    measurementDefs: [
      { key: 'arms',      labelAr: 'الأكمام',      labelEn: 'Arms(CM)'        },
      { key: 'shoulders', labelAr: 'الأكتاف',      labelEn: 'Shoulders(CM)'   },
      { key: 'lchest',    labelAr: 'الصدر السفلي', labelEn: '(CM)Lower Chest' },
    ],
    measurements: {
      S:    { arms: 13, shoulders: 18, lchest: 28 },
      M:    { arms: 13, shoulders: 18, lchest: 30 },
      L:    { arms: 15, shoulders: 20, lchest: 32 },
      XL:   { arms: 15, shoulders: 20, lchest: 34 },
      '2XL':{ arms: 17, shoulders: 21, lchest: 36 },
      '3XL':{ arms: 18, shoulders: 22, lchest: 38 },
      '4XL':{ arms: 19, shoulders: 23, lchest: 40 },
      '5XL':{ arms: 19, shoulders: 23, lchest: 42 },
    },
  },

  // ── 787 ──────────────────────────────────────────────────────────────────
  {
    code: '787',
    nameAr: 'مشد 787',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_787,
    availableSizes: ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'],
    measurementDefs: [
      { key: 'waist',     labelAr: 'الخصر',          labelEn: 'Waist(CM)'             },
      { key: 'hips',      labelAr: 'الورك',           labelEn: 'Hips(CM)'              },
      { key: 'thighs',    labelAr: 'الفخذ',           labelEn: 'Thighs(CM)'            },
      { key: 'lchest',    labelAr: 'الصدر السفلي',    labelEn: '(CM)Lower Chest'       },
      { key: 'shoulders', labelAr: 'بين الأكتاف',     labelEn: 'Between Shoulders(CM)' },
      { key: 'arms',      labelAr: 'الأكمام',         labelEn: 'Arms(CM)'              },
    ],
    measurements: {
      XS:   { waist: 22, hips: 30, thighs: 18, lchest: 28, shoulders: 30, arms: 12 },
      S:    { waist: 24, hips: 33, thighs: 21, lchest: 30, shoulders: 31, arms: 13 },
      M:    { waist: 26, hips: 35, thighs: 23, lchest: 32, shoulders: 32, arms: 13 },
      L:    { waist: 28, hips: 38, thighs: 25, lchest: 34, shoulders: 34, arms: 15 },
      XL:   { waist: 30, hips: 40, thighs: 28, lchest: 36, shoulders: 35, arms: 15 },
      '2XL':{ waist: 32, hips: 42, thighs: 30, lchest: 38, shoulders: 37, arms: 16 },
      '3XL':{ waist: 34, hips: 44, thighs: 32, lchest: 40, shoulders: 39, arms: 16 },
      '4XL':{ waist: 36, hips: 46, thighs: 34, lchest: 42, shoulders: 41, arms: 17 },
      '5XL':{ waist: 38, hips: 48, thighs: 36, lchest: 44, shoulders: 44, arms: 17 },
    },
  },

  // ── 789 ──────────────────────────────────────────────────────────────────
  {
    code: '789',
    nameAr: 'مشد 789',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_789,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL','5XL'],
    measurementDefs: [
      { key: 'waist',     labelAr: 'الخصر',          labelEn: 'Waist(CM)'             },
      { key: 'hips',      labelAr: 'الورك',           labelEn: 'Hips(CM)'              },
      { key: 'thighs',    labelAr: 'الفخذ',           labelEn: 'Thighs(CM)'            },
      { key: 'lchest',    labelAr: 'الصدر السفلي',    labelEn: '(CM)Lower Chest'       },
      { key: 'shoulders', labelAr: 'بين الأكتاف',     labelEn: 'Between Shoulders(CM)' },
      { key: 'arms',      labelAr: 'الأكمام',         labelEn: 'Arms(CM)'              },
    ],
    measurements: {
      S:    { waist: 24, hips: 33, thighs: 21, lchest: 30, shoulders: 31, arms: 13 },
      M:    { waist: 26, hips: 35, thighs: 23, lchest: 32, shoulders: 32, arms: 13 },
      L:    { waist: 28, hips: 38, thighs: 25, lchest: 34, shoulders: 34, arms: 15 },
      XL:   { waist: 30, hips: 40, thighs: 28, lchest: 36, shoulders: 35, arms: 15 },
      '2XL':{ waist: 32, hips: 42, thighs: 30, lchest: 38, shoulders: 37, arms: 16 },
      '3XL':{ waist: 34, hips: 44, thighs: 32, lchest: 40, shoulders: 39, arms: 16 },
      '4XL':{ waist: 36, hips: 46, thighs: 34, lchest: 42, shoulders: 41, arms: 17 },
      '5XL':{ waist: 38, hips: 48, thighs: 36, lchest: 44, shoulders: 44, arms: 17 },
    },
  },

  // ── 752 ──────────────────────────────────────────────────────────────────
  {
    code: '752',
    nameAr: 'مشد 752',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_752,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL'],
    bodySliders: ['waist'],
    measurementDefs: [
      { key: 'waist',  labelAr: 'الخصر',       labelEn: 'Waist(CM)'       },
      { key: 'down',   labelAr: 'الطول',        labelEn: 'DOWN(CM)'        },
      { key: 'lchest', labelAr: 'الصدر السفلي', labelEn: '(CM)Lower Chest' },
    ],
    measurements: {
      S:    { waist: 28, down: 33, lchest: 30 },
      M:    { waist: 30, down: 34, lchest: 32 },
      L:    { waist: 32, down: 36, lchest: 34 },
      XL:   { waist: 34, down: 38, lchest: 36 },
      '2XL':{ waist: 36, down: 40, lchest: 38 },
      '3XL':{ waist: 38, down: 42, lchest: 40 },
      '4XL':{ waist: 40, down: 45, lchest: 42 },
    },
  },

  // ── 754-1 ─────────────────────────────────────────────────────────────────
  {
    code: '754-1',
    nameAr: 'مشد 754',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_754,
    availableSizes: ['S','M','L','XL','2XL','3XL','4XL'],
    bodySliders: ['waist'],
    measurementDefs: [
      { key: 'waist',  labelAr: 'الخصر',       labelEn: 'Waist(CM)'       },
      { key: 'down',   labelAr: 'الطول',        labelEn: 'DOWN(CM)'        },
      { key: 'lchest', labelAr: 'الصدر السفلي', labelEn: '(CM)Lower Chest' },
    ],
    measurements: {
      S:    { waist: 28, down: 33, lchest: 30 },
      M:    { waist: 30, down: 34, lchest: 32 },
      L:    { waist: 32, down: 36, lchest: 34 },
      XL:   { waist: 34, down: 38, lchest: 36 },
      '2XL':{ waist: 36, down: 40, lchest: 38 },
      '3XL':{ waist: 38, down: 42, lchest: 40 },
      '4XL':{ waist: 40, down: 45, lchest: 42 },
    },
  },

  // ── 811 ──────────────────────────────────────────────────────────────────
  {
    code: '811',
    nameAr: 'مشد 811',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_811,
    availableSizes: ['XS','S','M','L','XL','2XL','3XL','4XL'],
    bodySliders: ['chest', 'waist'],
    gender: 'male',
    measurementDefs: [
      { key: 'down',      labelAr: 'الطول',       labelEn: 'DOWN(CM)'              },
      { key: 'waist',     labelAr: 'الخصر',        labelEn: 'Waist(CM)'             },
      { key: 'shoulders', labelAr: 'بين الأكتاف', labelEn: 'Between Shoulders(CM)' },
    ],
    measurements: {
      XS:   { down: 34, waist: 34, shoulders: 34 },
      S:    { down: 37, waist: 37, shoulders: 37 },
      M:    { down: 40, waist: 40, shoulders: 40 },
      L:    { down: 43, waist: 43, shoulders: 43 },
      XL:   { down: 46, waist: 46, shoulders: 46 },
      '2XL':{ down: 49, waist: 49, shoulders: 49 },
      '3XL':{ down: 52, waist: 52, shoulders: 52 },
      '4XL':{ down: 55, waist: 55, shoulders: 55 },
    },
  },

  // ── 670 ──────────────────────────────────────────────────────────────────
  {
    code: '670',
    nameAr: 'مشد 670',
    category: 'مشد',
    categoryIcon: '🩱',
    sizeGroup: GROUP_670,
    availableSizes: ['S','M','L','XL','2XL'],
    bodySliders: ['chest'],
    measurementDefs: [
      { key: 'down',      labelAr: 'الطول',       labelEn: 'DOWN(CM)'              },
      { key: 'chest',     labelAr: 'الصدر',        labelEn: '(CM)Chest "O"'         },
      { key: 'shoulders', labelAr: 'بين الأكتاف', labelEn: 'Between Shoulders(CM)' },
    ],
    measurements: {
      S:    { down: 31, chest: 49, shoulders: 21 },
      M:    { down: 34, chest: 50, shoulders: 23 },
      L:    { down: 37, chest: 50, shoulders: 25 },
      XL:   { down: 40, chest: 50, shoulders: 27 },
      '2XL':{ down: 43, chest: 50, shoulders: 29 },
    },
  },

  // ── 1010 ──────────────────────────────────────────────────────────────────
  // Special algorithm: size determined by height range + weight threshold
  {
    code: '1010',
    nameAr: 'مشد 1010',
    category: 'مشد',
    categoryIcon: '🩱',
    isFaceProduct: true,
    bodySliders: [],
    sizeGroup: GROUP_670, // placeholder (customCalculate overrides)
    availableSizes: ['S', 'XL'],
    note: '32/34 = S/M  •  36/38 = L/XL',
    customCalculate: (height: number, weight: number): SizeName => {
      let threshold: number;
      if      (height <= 150) threshold = 59;
      else if (height <= 157) threshold = 69;
      else if (height <= 170) threshold = 79;
      else                    threshold = 80;
      return weight < threshold ? 'S' : 'XL';
    },
    measurementDefs: [
      { key: 'neck',  labelAr: 'الرقبة', labelEn: 'Neck(CM)'  },
      { key: 'face',  labelAr: 'الوجه',  labelEn: 'Face(CM)'  },
      { key: 'width', labelAr: 'العرض',  labelEn: '(CM)Width' },
    ],
    measurements: {
      S:  { neck: 18, face: 20, width: 13 },
      XL: { neck: 23, face: 27, width: 17 },
    },
  },
];
