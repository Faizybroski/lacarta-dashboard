import { create } from "zustand"
import { getCookie, setCookie, removeCookie } from "../cookies/cookies"
import { AUTH_COOKIE } from "./auth.constants"
import { AuthSession } from "./auth.types"

interface AuthState {
  user: AuthSession["user"] | null
  accessToken: string

  setSession: (session: AuthSession) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  const cookie = getCookie(AUTH_COOKIE)
  const initial = cookie ? JSON.parse(cookie) : null

  return {
    user: initial?.user ?? null,
    accessToken: initial?.accessToken ?? "",

    setSession: (session) => {
      setCookie(AUTH_COOKIE, JSON.stringify(session))

      set({
        user: session.user,
        accessToken: session.accessToken
      })
    },

    logout: () => {
      removeCookie(AUTH_COOKIE)

      set({
        user: null,
        accessToken: ""
      })
    }
  }
})