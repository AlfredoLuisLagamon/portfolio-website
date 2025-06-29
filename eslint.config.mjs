import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    // Exclude build directories and generated files
    ignores: [
      '.next/**/*',
      'out/**/*',
      'node_modules/**/*',
      '.git/**/*',
      '**/*.config.js',
      '**/*.config.mjs',
      'dist/**/*',
      'build/**/*'
    ],
    rules: {
      // Basic rules for code quality
      '@next/next/no-img-element': 'warn',
      'react/no-unescaped-entities': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'react/display-name': 'warn',
    },
  },
];

export default eslintConfig; 