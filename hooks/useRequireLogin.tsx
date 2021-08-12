import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "./useCurrentUser";

export const useRequireLogin = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isAuthChecking) return;
    if (!CurrentUser) router.push("/auth/login");
  }, [isAuthChecking, CurrentUser]);
};

// only verified user
export const useRequireVerified = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isAuthChecking) return;
    if (!CurrentUser || (CurrentUser && !CurrentUser.isVerify))
      router.push("/auth/login");
  }, [isAuthChecking, CurrentUser]);
};

export const useRequireAnonymous = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isAuthChecking) return;
    if (CurrentUser) router.push("/anime");
  }, [isAuthChecking, CurrentUser]);
};
