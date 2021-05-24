import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { fetchCurrentUser } from "../helper/UserHelper";
import { useRouter } from "next/router";
import CurrentUserState from "../states/CurrentUser";
import BaseLayouts from "../components/BaseLayouts";
import ListHeader from "../components/ListHeader";
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
      <BaseLayouts>
        <ListHeader list={pageProps.list}></ListHeader>
        <Component {...pageProps}></Component>
      </BaseLayouts>
      <AppInt />
    </RecoilRoot>
  );
}

export default MyApp;
