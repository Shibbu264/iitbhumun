/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head><link rel="stylesheet" href="/styles.css" />
        {/* Seo needs to be done */}
        <title>IITBHU MUN</title>
        <meta
          name="keywords"
          content="modelunitednations ,mun ,unitednations ,imun ,youth ,internationalconference ,internationalmun ,un ,diplomacy ,munconference ,conference ,onlinemun ,international ,onlineconference ,leaders ,globalopportunity ,opportunity ,youngleaders ,online ,webinar ,modelun ,debate ,internationalrelations ,youthleader ,youthpower ,diversity ,asiamun ,india ,malaysia ,identitycrisis ,iitbhu ,iitdelhi ,iitbombay ,iit ,iitkanpur ,iitkgp ,iitmadras ,iitroorkee ,iitmemes ,iitguwahati ,iithyderabad ,bhu ,iitkharagpur ,iitian ,iitindore ,iitpatna ,iitropar ,iitmandi ,iitjodhpur ,memes ,iitdhanbad ,iitjammu ,engineeringmemes ,iitgoa ,collegememes ,iitb ,memesdaily ,gpat ,meme ,sarcasm"
        />
        <meta
          name="description"
          content="Congratulations! We&#39;re very excited that you will be doing Model United Nations for the first time. You are about to embark on a life-changing journey that will help you develop confidence in leading others, a stronger awareness of global issues, and the chance to make new friends from around the world. Model UN is a […"
        />
        <meta property="og:url" content="https://iitbhumun.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/images/Vector-dark.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
