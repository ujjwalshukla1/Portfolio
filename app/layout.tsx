import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio | Full Stack Developer",
  description: "Professional portfolio showcasing my skills, projects, and expertise in web development",
  icons: {
    icon: "/port.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{const t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
