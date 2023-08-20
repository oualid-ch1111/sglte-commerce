import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import 'typeface-roboto';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
export default MyApp;
