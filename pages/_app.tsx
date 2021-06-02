import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { fetchCurrentUser } from "../helper/UserHelper";
import { useRouter } from "next/router";
import CurrentUserState from "../states/CurrentUser";
import BaseLayouts from "../components/BaseLayouts";
import ListHeader from "../components/ListHeader";
import MessageComponent from "../components/Message";
import "../styles/globals.css";

const AppInt = (): null => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);
  useEffect(() => {
    (async function () {
      try {
        const CurrentUser = await fetchCurrentUser();
        setCurrentUser(CurrentUser);
      } catch {
        setCurrentUser(null);
      }
    })();
  }, []);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BaseLayouts
        // header
        list={pageProps.list}
        uid={pageProps.uid}
        kind={pageProps.kind}
        // head
        title={pageProps.title}
        ogType={pageProps.ogType}
        ogImage={pageProps.ogImage}
        ogDescription={pageProps.ogDescription}
        ogSeoDescription={pageProps.ogSeoDescription}
        robots={pageProps.robots}
      >
        <Component {...pageProps}></Component>
      </BaseLayouts>
      <AppInt />
    </RecoilRoot>
  );
}

export default MyApp;
