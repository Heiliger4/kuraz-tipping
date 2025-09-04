import { create } from 'zustand'

type Route = 'home' | 'profile'

interface RouteState {
  currentRoute: Route
  setRoute: (route: Route) => void
}

export const useRouteStore = create<RouteState>((set) => ({
  currentRoute: 'home',
  setRoute: (route) => set({ currentRoute: route }),
}))
