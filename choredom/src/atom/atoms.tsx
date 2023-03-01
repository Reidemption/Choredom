import { atom } from 'recoil'

interface User {
	uid: string
	displayName: string | null
	email: string | null
}

export const userState = atom<User | null>({
	key: 'userState',
	default: null,
})
