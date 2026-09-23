import {
  Baloo_Bhaijaan_2,
  Varela_Round,
  Zeyada,
} from "next/font/google";
import localFont from "next/font/local";

export const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-fa",
  display: "swap",
});

export const varelaRound = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body-en",
  display: "swap",
});

export const iranRounded = localFont({
  src: "./local/IranRounded.woff2",
  weight: "400",
  variable: "--font-heading-fa",
  display: "swap",
});

export const qasedak = localFont({
  src: "./local/Qasedak.woff2",
  weight: "400",
  variable: "--font-special1-fa",
  display: "swap",
});

export const sligoilMicro = localFont({
  src: "./local/SligoilMicro.woff2",
  weight: "400",
  variable: "--font-heading-en",
  display: "swap",
}); 

export const zeyada = Zeyada({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special1-en",
  display: "swap",
});

export const terminalGrotesque = localFont({
  src: "./local/TerminalGrotesque.woff2",
  weight: "400",
  variable: "--font-special2-raw",
  display: "swap",
});

export const fontVariables = [
  balooBhaijaan2.variable,
  varelaRound.variable,
  iranRounded.variable,
  sligoilMicro.variable,
  qasedak.variable,
  zeyada.variable,
  terminalGrotesque.variable,
].join(" ");