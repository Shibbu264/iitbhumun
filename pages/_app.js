import { SessionProvider } from "next-auth/react"
import Head from 'next/head';
import '../styles/globals.css';
import GlobalProvider from "../components/Providers/GlobalProvider";
import { Provider } from "react-redux";
import { store } from "../lib/store";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <GlobalProvider>
          <Head>
            <title>IITBHU MUN</title>
            <meta
              name="keywords"
              content="modelunitednations ,mun ,unitednations ,imun ,youth ,internationalconference ,internationalmun ,un ,diplomacy ,munconference ,conference ,onlinemun ,international ,onlineconference ,leaders ,globalopportunity ,opportunity ,youngleaders ,online ,webinar ,modelun ,debate ,internationalrelations ,youthleader ,youthpower ,diversity ,asiamun ,india ,malaysia ,identitycrisis ,iitbhu ,iitdelhi ,iitbombay ,iit ,iitkanpur ,iitkgp ,iitmadras ,iitroorkee ,iitmemes ,iitguwahati ,iithyderabad ,bhu ,iitkharagpur ,iitian ,iitindore ,iitpatna ,iitropar ,iitmandi ,iitjodhpur ,memes ,iitdhanbad ,iitjammu ,engineeringmemes ,iitgoa ,collegememes ,iitb ,memesdaily ,gpat ,meme ,sarcasm"
            />
            <meta
              name="description"
              content="Congratulations! We're very excited that you will be doing Model United Nations for the first time. You are about to embark on a life-changing journey that will help you develop confidence in leading others, a stronger awareness of global issues, and the chance to make new friends from around the world. Model UN is a […"
            />
            <meta property="og:url" content="https://iitbhumun.com/" />
            <meta property="og:type" content="website" />
            <link rel="icon" href="/images/Vector-dark.png" />
          </Head>
          <Component {...pageProps} />
        </GlobalProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
