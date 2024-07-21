import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js" async/>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/base.min.css"
        />
        <script
          src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" async
          type="text/javascript"
        ></script>
        <link rel="icon" href="#" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
