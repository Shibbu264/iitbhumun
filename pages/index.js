import Script from 'next/script';
import Home from './home';

export default function App() {
  return (
    <div>
      <Home />
      <Script src="/ai.js" type="module"></Script>
    </div>
  );
}
