import { Silkscreen, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Piyush Singh | Portfolio",
  description: "Portfolio of Piyush Singh",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/frames/frame_000_delay-0.043s.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen font-silkscreen selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
