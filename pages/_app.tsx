import "../src/css/normalize.css";
import "choices.js/public/assets/styles/choices.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/states.css";
import "swiper/css";
import "../src/css/style.css";
import { CartProvider } from "../components/Basket";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default App;
