/// <reference types="node" />
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { PluginOption, UserConfig } from 'vite';

async function getBundleVisualizerPlugin(): Promise<PluginOption | undefined> {
  if (!process.env.ANALYZE) return undefined;

  const { visualizer } = await import('rollup-plugin-visualizer');

  return visualizer({
    filename: 'dist/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  });
}

export default defineConfig(async (): Promise<UserConfig> => {
  const visualizerPlugin = await getBundleVisualizerPlugin();

  return {
    plugins: [react(), ...(visualizerPlugin ? [visualizerPlugin] : [])],
    envPrefix: ['VITE_', 'PUBLIC_'],
    server: {
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      modulePreload: {
        // Keep modulepreload generally enabled, but avoid preloading non-critical chunks.
        // In particular, we don't want to fetch/parse animation/scroll/icon chunks on initial load.
        resolveDependencies: (_filename: string, deps: readonly string[]) =>
          deps.filter(
            (dep) =>
              !dep.includes('motion-') &&
              !dep.includes('scroll-') &&
              !dep.includes('icons-') &&
              !dep.includes('useWillChange-') &&
              !dep.includes('motionHelpers-') &&
              !dep.includes('animations-'),
          ),
      },
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (!id.includes('node_modules')) return;

            // Keep React + its JSX runtime together.
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'vendor';
            }

            // Keep framer-motion isolated so it's only fetched when needed.
            if (id.includes('/node_modules/framer-motion/')) {
              return 'motion';
            }

            if (id.includes('/node_modules/lenis/')) {
              return 'scroll';
            }

            if (
              id.includes('/node_modules/react-icons/hi/') ||
              id.includes('/node_modules/react-icons/hi2/') ||
              id.includes('/node_modules/react-icons/fa/')
            ) {
              return 'icons';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: 'esbuild',
    },
    optimizeDeps: {
      include: ['react-icons/hi', 'react-icons/hi2', 'react-icons/fa'],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  };
});
