"use client";

import ContactForm from "./components/Form";
import Countdown from "./components/Countdown";
import RSVPSection from "./sections/RSVPSection";
import CountdownSection from "./sections/CountdownSection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hanna & Anders</title>
        <meta property="og:title" content="Hanna & Anders" key="title" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full flex-col items-center justify-center font-mono text-sm lg:flex">
          {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
            </a>
        </div> */}

          {/* HERO - with image */}
          {/* RSVP */}
          {/* Contact Toastmaster */}
          {/* Map + Instructions */}
          {/* Countdown */}
          {/* Children Information */}
          {/* Dresscode */}

          <CountdownSection />
          {/* <RSVPSection /> */}
        </div>
      </main>
    </>
  );
}
