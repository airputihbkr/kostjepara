import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KostJepara",
  description: "Direktori kos-kosan terbaik di Jepara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
