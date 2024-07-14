import '../src/css/normalize.css';
import 'choices.js/public/assets/styles/choices.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/states.css';
import '../src/css/style.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;