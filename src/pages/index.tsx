import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useIframeSdk } from '@whop/react'
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const iframeSdk = useIframeSdk();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function purchase() {
      const param = new URLSearchParams(window.location.search);
      
      const iapParam = param.get("iap");

      if (!iapParam) {
        console.error("No 'iap' parameter found in URL");
        return;
      }

      console.log(btoa(iapParam));

      const data = JSON.parse(atob(iapParam));

      setLoading(true);
      try {
        const res = await iframeSdk.inAppPurchase({
          id: data.id,
          planId: data.planId
        })

        console.log("data:", data);

        console.log(res);

        if (res.status === "ok") {
          console.log(res.data);
        } else {
          console.log(res.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    purchase();
  }, [])

  return (
    <div>
      <h1>Confirm UI</h1>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <p>Done</p>
        )
      }
    </div>
  );
}
