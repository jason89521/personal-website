import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const theme = localStorage.getItem('theme') ?? 'light'
            if (theme === 'dark') {
              document.documentElement.classList.add('dark')
            }
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
