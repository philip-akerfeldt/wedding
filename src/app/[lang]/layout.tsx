import '../globals.css'

import localFont from 'next/font/local'

import { getDictionary } from '../../../get-dictionary'
import { i18n } from '../../../i18n-config'
import { DictionariesProvider } from '../context/dictionaryContext'

import type { Metadata } from "next";
const josefinSans = localFont({
  src: "../../../public/fonts/josefin-sans/JosefinSans-Regular.ttf",
  variable: "--font-josefinSans"
});

const leJourSerif = localFont({
  src: "../../../public/fonts/le-jour-serif/LeJourSerif.ttf",
  variable: "--font-leJourSerif"
});

const unJourMerveilleux = localFont({
  src: "../../../public/fonts/un-jour-merveilleux/UnJourMerveilleux-Regular.ttf",
  variable: "--font-unJourMerveilleux"
});

export const metadata: Metadata = {
  title: "Hanna & Anders",
  description: "Hanna & Anders bröllopssida.",
  authors: [{ name: "Philip Åkerfeldt" }]
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang as "sv" | "en");
  return (
    <html
      lang={lang}
      className={`${josefinSans.variable} ${leJourSerif.variable} ${unJourMerveilleux.variable}`}
    >
      <DictionariesProvider dictionary={dictionary}>
        <body className={`lg:min-h-screen`}>{children}</body>
      </DictionariesProvider>
    </html>
  );
}
