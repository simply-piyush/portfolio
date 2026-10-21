import { Press_Start_2P, Silkscreen, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

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
  metadataBase: new URL("https://www.piyushxyz.dev"),
  title: {
    default: "Piyush Singh | Frontend Developer & Software Engineer",
    template: "%s | Piyush Singh",
  },
  description:
    "Portfolio of Piyush Singh, a Computer Science student and software developer specializing in frontend development, React, Next.js, and interactive digital experiences.",
  alternates: {
    canonical: "https://www.piyushxyz.dev/",
  },
  authors: [{ name: "Piyush Singh", url: "https://www.piyushxyz.dev" }],
  creator: "Piyush Singh",
  publisher: "Piyush Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.piyushxyz.dev/",
    siteName: "Piyush Singh Portfolio",
    title: "Piyush Singh | Frontend Developer & Software Engineer",
    description:
      "Portfolio of Piyush Singh, a Computer Science student and software developer specializing in frontend development, React, Next.js, and interactive digital experiences.",
  },
  twitter: {
    card: "summary",
    title: "Piyush Singh | Frontend Developer & Software Engineer",
    description:
      "Portfolio of Piyush Singh, a Computer Science student and software developer specializing in frontend development, React, Next.js, and interactive digital experiences.",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.piyushxyz.dev/#person",
      name: "Piyush Singh",
      url: "https://www.piyushxyz.dev/",
      jobTitle: "Frontend Developer & Software Engineer",
      description:
        "Computer Science student and software developer specializing in frontend development, React, Next.js, and interactive digital experiences.",
      sameAs: [
        "https://www.linkedin.com/in/piyush-singh007",
        "https://github.com/simply-piyush",
      ],
      knowsAbout: [
        "Frontend Development",
        "React",
        "Next.js",
        "JavaScript",
        "Tailwind CSS",
        "Web Development",
        "GSAP",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.piyushxyz.dev/#website",
      url: "https://www.piyushxyz.dev/",
      name: "Piyush Singh Portfolio",
      publisher: {
        "@id": "https://www.piyushxyz.dev/#person",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${pressStart2P.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/frames/frame_000_delay-0.043s.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-silkscreen selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
