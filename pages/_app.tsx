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
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  );
}
