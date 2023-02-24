import { atom } from 'recoil'

export interface UserInfo {
	uid: any
	email: any
}

const defaultUserInfo: UserInfo = {
	uid: '',
	email: '',
}

// This atom is used to store the user's authentication state
export const authStateAtom = atom<UserInfo | undefined>({
	key: 'authState',
	default: defaultUserInfo,
})
