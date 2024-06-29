import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagmanager from "@/components/GoogleAnalytics";
import Head from "next/head";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookbook demo",
  description: "Lorem ipsum dolor sit",
  openGraph: {
    title: "Cookbook",
    description: "Lorem ipsum dolor sit",
    images: [
      "https://cdn.sanity.io/images/hm2w9yds/production/13a55b8e9ffbb2fa8dbe3bcf285ef9fb021966bc-770x513.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <GoogleTagmanager />

      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M66G7VK" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />

        {children}
      </body>
    </html>
  );
}
