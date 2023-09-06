import "@/styles/globals.css";
import "react-calendar/dist/Calendar.css"; // css import
import "@/styles/Calender.css";
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
import DubMissionCompleteModal from "@/features/dubbing/organism/DubMissionCompleteModal";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

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
  const router = useRouter()
  const pageKey = router.asPath

  return (
    <main className={pretendard.className}>
      <Scripts />
      <Head>
        <title>덥잉, 더빙으로 배우는 영어 쉐도잉 서비스</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:url" content="https://dub-eng.com" />
        <meta property="og:title" content="DubEng" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/images/logo/dub-eng-open-graph.png"
        />
        <meta
          property="og:description"
          content="더빙으로 배우는 영어 쉐도잉 서비스, 따라 읽기만 하던 영어는 이제 그만, 덥잉을 통해 좋아하는 영상을 보며 쉽고 재미있게 영어를 공부해 보세요!"
        />
        <meta
          name="keywords"
          content="영어 스피킹, 영어 더빙, 미드 영어, 영드 영어, 애니 영어 english speaking, english study, easy english, funny english"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <Header />
            <NavigationBar />
            <DubMissionCompleteModal />
            <AnimatePresence initial={false}>
              <Component key={pageKey} {...pageProps} />
            </AnimatePresence>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </main>
  );
}
