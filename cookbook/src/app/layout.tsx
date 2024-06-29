import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagmanager from "@/components/GoogleAnalytics";

export const metadata = {
  title: "Cookbook demo",
  description: "Lorem ipsum dolor sit",
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
