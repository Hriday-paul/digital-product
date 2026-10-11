import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/shared/ReduxProvider";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import NextJsTopLoader from "@/shared/NextJsTopLoader";
import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer/Footer";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Asifzonebd',
    default: 'Asifzonebd',
  },
  description: "Asifzonebd providing the best digital services in Bangladesh. We offer a wide range of premium services.",

  keywords: ["Asifzonebd", "Asifzonebd.com", "Asifzonebd.net", "Asifzonebd.org", "Asifzonebd.co", "Asifzonebd.info", "Asifzonebd.biz", "Asifzonebd.online", "Asifzonebd.store", "Asifzonebd.tech", "Asifzonebd.site", "Asifzonebd.app", "Asifzonebd.dev", "Asifzonebd.io", "Asifzonebd.ai", "digital services", "subscription services", "premium services", "Bangladesh", "ai premium services"],

  metadataBase: new URL('https://asifzonebd.com'),

  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'x-default': '/'
    }
  },

  openGraph: {
    title: 'Asifzonebd - Digital Services in Bangladesh',
    description: 'Asifzonebd providing the best digital services in Bangladesh. We offer a wide range of premium services.',
    url: 'https://asifzonebd.com',
    siteName: 'Asifzonebd',
    images: ["https://asifzonebd.com/og-image.png"],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asifzonebd - Digital Services in Bangladesh',
    description: 'Asifzonebd providing the best digital services in Bangladesh. We offer a wide range of premium services.',
    creator: '@asifzonebd',
    images: ['https://asifzonebd.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const jsonLd = gen_JsonLdGlobal();

  return (
    <html lang="en">

      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>

      <body className={`${montserrat.variable} antialiased`}>

        <ReduxProvider>
          {/* <TawkTo /> */}
          <Toaster richColors position="top-right" closeButton />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <NextJsTopLoader />

          <Navbar />
          {children}
          <Footer />

        </ReduxProvider>

        {/* ✅ Multiple JSON-LD inject */}
        {/* {jsonLd.map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))} */}
      </body>
    </html>
  );
}
