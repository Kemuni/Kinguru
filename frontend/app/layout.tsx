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
      <body
        className={`${lilitaOne.variable} ${libreFranklin.variable} ${inter.variable} antialiased lg:px-72 xl:px-96`}
      >
        {children}
      </body>
    </html>
  );
}
