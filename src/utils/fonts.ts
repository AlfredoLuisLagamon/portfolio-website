// Font configuration file for optimized font loading
import { Inter } from 'next/font/google';

// Configure the Inter font
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});
