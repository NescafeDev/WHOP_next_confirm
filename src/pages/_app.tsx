import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { WhopIframeSdkProvider } from "@whop/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WhopIframeSdkProvider>
      <Component {...pageProps} />
    </WhopIframeSdkProvider>
  );
}
