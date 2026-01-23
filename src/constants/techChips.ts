type TechChipKey = string;

const TECH_CHIP_KEY_ALIASES: Record<TechChipKey, TechChipKey> = {
  react: 'react',
  reactnative: 'reactnative',
  expo: 'expo',
  typescript: 'typescript',
  javascript: 'javascript',
  tailwind: 'tailwind',
  tailwindcss: 'tailwind',
  vite: 'vite',
  vue: 'vue',
  astro: 'astro',

  css: 'css',
  csscustomproperties: 'csscustomproperties',

  accessibleuipatterns: 'accessibleuipatterns',
  html40transitional: 'html40transitional',
  gamedesign: 'gamedesign',
  particlesystems: 'particlesystems',
  physicssimulation: 'physicssimulation',

  node: 'node',
  nodejs: 'node',
  vercel: 'vercel',

  supabase: 'supabase',
  postgresql: 'postgresql',

  framermotion: 'framermotion',

  canvas2d: 'canvas2d',
  webaudioapi: 'webaudioapi',

  eleventy: 'eleventy',
  nunjucks: 'nunjucks',

  asyncstorage: 'asyncstorage',
};

const TECH_CHIP_CLASSES: Record<TechChipKey, string> = {
  react:
    'border-[#9333ea]/30 bg-[#9333ea]/10 hover:bg-[#9333ea]/15 hover:border-[#9333ea]/45 dark:border-[#c4b5fd]/30 dark:bg-[#a78bfa]/10',
  reactnative:
    'border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/15 hover:border-cyan-500/45 dark:border-cyan-300/30 dark:bg-cyan-400/10',
  expo: 'border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/15 hover:border-indigo-500/45 dark:border-indigo-300/30 dark:bg-indigo-400/10',
  typescript:
    'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/15 hover:border-blue-500/45 dark:border-blue-300/30 dark:bg-blue-400/10',
  javascript:
    'border-yellow-500/35 bg-yellow-500/15 hover:bg-yellow-500/20 hover:border-yellow-500/55 dark:border-yellow-300/35 dark:bg-yellow-400/10',
  tailwind:
    'border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/15 hover:border-teal-500/45 dark:border-teal-300/30 dark:bg-teal-400/10',
  vite: 'border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/15 hover:border-violet-500/45 dark:border-violet-300/30 dark:bg-violet-400/10',
  vue: 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/15 hover:border-emerald-500/45 dark:border-emerald-300/30 dark:bg-emerald-400/10',
  astro:
    'border-orange-500/35 bg-orange-500/15 hover:bg-orange-500/20 hover:border-orange-500/55 dark:border-orange-300/35 dark:bg-orange-400/10',

  css: 'border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/15 hover:border-purple-500/45 dark:border-purple-300/30 dark:bg-purple-400/10',
  csscustomproperties:
    'border-[#7c3aed]/30 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/15 hover:border-[#7c3aed]/45 dark:border-[#c4b5fd]/30 dark:bg-[#a78bfa]/10',

  accessibleuipatterns:
    'border-[#0f766e]/30 bg-[#0f766e]/10 hover:bg-[#0f766e]/15 hover:border-[#0f766e]/45 dark:border-[#5eead4]/30 dark:bg-[#2dd4bf]/10',
  html40transitional:
    'border-gray-500/30 bg-gray-500/10 hover:bg-gray-500/15 hover:border-gray-500/45 dark:border-gray-300/30 dark:bg-gray-400/10',

  node: 'border-green-500/35 bg-green-500/15 hover:bg-green-500/20 hover:border-green-500/55 dark:border-green-300/35 dark:bg-green-400/10',
  vercel:
    'border-zinc-500/35 bg-zinc-500/10 hover:bg-zinc-500/15 hover:border-zinc-500/55 dark:border-zinc-300/30 dark:bg-zinc-400/10',

  supabase:
    'border-lime-500/35 bg-lime-500/15 hover:bg-lime-500/20 hover:border-lime-500/55 dark:border-lime-300/35 dark:bg-lime-400/10',
  postgresql:
    'border-slate-500/35 bg-slate-500/10 hover:bg-slate-500/15 hover:border-slate-500/55 dark:border-slate-300/30 dark:bg-slate-400/10',

  framermotion:
    'border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/15 hover:border-pink-500/45 dark:border-pink-300/30 dark:bg-pink-400/10',

  canvas2d:
    'border-[#15803d]/35 bg-[#15803d]/12 hover:bg-[#15803d]/16 hover:border-[#15803d]/55 dark:border-[#86efac]/30 dark:bg-[#22c55e]/10',
  webaudioapi:
    'border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/15 hover:border-rose-500/45 dark:border-rose-300/30 dark:bg-rose-400/10',

  gamedesign:
    'border-sky-500/35 bg-sky-500/15 hover:bg-sky-500/20 hover:border-sky-500/55 dark:border-sky-300/35 dark:bg-sky-400/10',
  particlesystems:
    'border-fuchsia-500/30 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 hover:border-fuchsia-500/45 dark:border-fuchsia-300/30 dark:bg-fuchsia-400/10',
  physicssimulation:
    'border-[#1f2937]/25 bg-[#1f2937]/10 hover:bg-[#1f2937]/15 hover:border-[#1f2937]/35 dark:border-[#e5e7eb]/25 dark:bg-[#9ca3af]/10',

  eleventy:
    'border-[#db2777]/35 bg-[#db2777]/10 hover:bg-[#db2777]/15 hover:border-[#db2777]/55 dark:border-[#fbcfe8]/30 dark:bg-[#f472b6]/10',
  nunjucks:
    'border-fuchsia-500/35 bg-fuchsia-500/15 hover:bg-fuchsia-500/20 hover:border-fuchsia-500/55 dark:border-fuchsia-300/35 dark:bg-fuchsia-400/10',

  asyncstorage:
    'border-red-500/30 bg-red-500/10 hover:bg-red-500/15 hover:border-red-500/45 dark:border-red-300/30 dark:bg-red-400/10',
};

const toTechChipKey = (label: string): TechChipKey => {
  const noParens = label.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const noTrailingVersion = noParens.replace(/\s+\d+(?:\.\d+)*$/g, '').trim();
  const collapsed = noTrailingVersion.replace(/\s+/g, ' ');
  const alnum = collapsed.toLowerCase().replace(/[^a-z0-9]+/g, '');

  return TECH_CHIP_KEY_ALIASES[alnum] ?? alnum;
};

export const getTechChipClassName = (label: string): string | undefined => {
  const key = toTechChipKey(label);
  return TECH_CHIP_CLASSES[key];
};

const TECH_CHIP_PRIORITY: Readonly<Record<TechChipKey, number>> = {
  react: 10,
  reactnative: 10,
  expo: 12,
  vue: 14,
  astro: 16,
  eleventy: 18,

  typescript: 30,
  javascript: 32,

  tailwind: 40,
  css: 42,
  csscustomproperties: 44,

  vite: 50,
  node: 52,
  supabase: 54,
  postgresql: 56,
  vercel: 58,

  framermotion: 70,

  canvas2d: 80,
  webaudioapi: 82,
  gamedesign: 84,
  particlesystems: 86,
  physicssimulation: 88,

  nunjucks: 90,
  asyncstorage: 92,
  accessibleuipatterns: 94,
  html40transitional: 96,
} as const;

const getTechChipPriority = (label: string): number => {
  const key = toTechChipKey(label);
  return TECH_CHIP_PRIORITY[key] ?? 999;
};

export const sortTechLabels = (labels: readonly string[]): string[] => {
  return [...labels].sort((a, b) => {
    const priorityA = getTechChipPriority(a);
    const priorityB = getTechChipPriority(b);
    if (priorityA !== priorityB) return priorityA - priorityB;

    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  });
};
