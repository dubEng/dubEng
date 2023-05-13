import "@/styles/globals.css";
import localFont from "next/font/local";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../stores/store";
import { QueryClientProvider, QueryClient } from "react-query";
import NavigationBar from "@/components/atoms/NavigationBar";
import Header from "@/components/atoms/Header";
import "regenerator-runtime/runtime";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Scripts from "@/components/Scripts";
import Head from "next/head";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/Pretendard-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../../public/fonts/Pretendard-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-pretendard",
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <main className={pretendard.className}>
      <Scripts />
      <Head>
        <title>덥잉, 더빙으로 영어 학습</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      
        <meta property="og:url" content="https://dub-eng.com"/>
        <meta property="og:title" content="DubEng" />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://dubingdubing.s3.ap-northeast-2.amazonaws.com/dub-eng-open-graph.png"/>
        <meta property="og:description" content="더빙으로 배우는 영어 쉐도잉 서비스"/>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <Header />
            <NavigationBar />
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </main>
  );
}
