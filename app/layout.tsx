import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Enablement Scorecard",
  description:
    "Assess your AI readiness and receive a personalized 30-day upskilling roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
