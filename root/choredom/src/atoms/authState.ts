import { atom } from "recoil";

export interface AuthState {
  signedIn: boolean;
}
const defaultAuthState: AuthState = {
  signedIn: false,
};

export const authState = atom<AuthState>({
  key: "authState",
  default: defaultAuthState,
});
