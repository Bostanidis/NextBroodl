import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const fugazOne = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year",
};

export default function RootLayout({ children }) {

  const header = (
    <header className={`p-4 sm:p-8 flex items-center justify-between gap-4`}>
      <Link href="/">
        <h1 className={"text-base sm:text-lg fugazOne textGradient " + fugazOne.className}>Broodl</h1>
      </Link>

      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={"text-emerald-500 " + fugazOne.className }>Created by Alexandros From CodeCultureCY</p>
    </footer>
  )


  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={(`${OpenSans.variable} ${fugazOne.variable}antialiased`) + (" w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800")}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
