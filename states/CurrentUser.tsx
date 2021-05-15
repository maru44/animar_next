import { atom } from "recoil";
import { TUser } from "../types/auth";

export const CurrentUserState = atom<undefined | null | TUser>({
  key: "CurrentUser",
  default: undefined,
});

export default CurrentUserState;
