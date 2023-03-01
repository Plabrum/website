import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const recaptcha_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  return (
    <ThemeProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={recaptcha_key}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <Head>
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            id="favicon"
            rel="apple-touch-icon"
            href="/apple-touch-icon.png"
          />
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-512x512.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  );
}
