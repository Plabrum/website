import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}

      <body className="bg-custom-bg1 text-custom-t1">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
