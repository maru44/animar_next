import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "./useCurrentUser";

export const useRequireLogin = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isAuthChecking) return;
    if (!CurrentUser) router.push("/user/login");
  }, [isAuthChecking, CurrentUser]);
};

export const useRequireVerified = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isAuthChecking) return;
    if (!CurrentUser || (CurrentUser && !CurrentUser.isVerify))
      router.push("/user/login");
  }, [isAuthChecking, CurrentUser]);
};
