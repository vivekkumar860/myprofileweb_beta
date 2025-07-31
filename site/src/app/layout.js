import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "../components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vivek Kumar - Talent Acquisition Coordinator",
  description: "Portfolio website of Vivek Kumar - Talent Acquisition Coordinator and B.Tech. CSE (AI & ML) Student",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
