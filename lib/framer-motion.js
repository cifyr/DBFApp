'use client';

// The package root can resolve unreliably in this iCloud-backed workspace.
// Re-exporting from a vendored copy avoids depending on a corrupt node_modules package directory.
export * from '../vendor/framer-motion/dist/es/index.mjs';
