import "../styles/globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "RumorStreet - Stock Market Simulation Game",
  description: "Invest based on rumors and past news in this immersive stock market simulation",
  keywords: "stock market, game, simulation, finance, trading",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
