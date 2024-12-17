import "../public/static/styles/globals.css";
import localFont from "next/font/local";

const lilitaOne = localFont({
  src: "../public/static/fonts/LilitaOne.ttf",
  variable: "--font-header",
  weight: "400",
});
const libreFranklin = localFont({
  src: "../public/static/fonts/LibreFranklin.ttf",
  variable: "--font-subheader",
  weight: "600",
});
const inter = localFont({
  src: "../public/static/fonts/Inter.ttf",
  variable: "--font-text",
  weight: "300",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <title>KinoGuru</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui"/>
      </head>
      <body
        className={`${lilitaOne.variable} ${libreFranklin.variable} ${inter.variable} antialiased flex justify-center 
        w-full`}
      >
        <div className="w-full lg:w-[calc(100dvh*0.4)]">
          {children}
        </div>
      </body>
    </html>
  );
}
