import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Colour Palette",
  description: "Generate beautiful and colourful palettes for your websites and logos",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon.ico',
        href: '/images/favicon.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon.ico',
        href: '/images/favicon.ico',
      },
    ],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
