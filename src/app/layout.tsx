import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "AuditScore",
  description: "DeFi Risk Intelligence, Quantified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        />
      </head>
      <body
        className={`${inter.variable} bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans overflow-x-hidden min-h-screen flex flex-col`}
      >
        <Providers>
          <NavbarWrapper />
          {children}
        </Providers>
        <footer className="border-t border-surface-border bg-background-dark pt-3 pb-3 px-4 md:px-10 text-text-secondary text-sm text-center">
          © 2026 AuditScore Inc. Not financial advice.
        </footer>
      </body>
    </html>
  );
}
