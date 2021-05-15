import { useRecoilValue } from "recoil";
import CurrentUserState from "../states/CurrentUser";

export const useCurrentUser = () => {
  const CurrentUser = useRecoilValue(CurrentUserState);
  const isAuthChecking = CurrentUser === undefined;

  return {
    CurrentUser,
    isAuthChecking,
  };
};
