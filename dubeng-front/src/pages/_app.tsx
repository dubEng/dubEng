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
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <Header />
            <NavigationBar />
            <div className="mt-57 mb-61">
              <Component {...pageProps} />
            </div>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </main>
  );
}
