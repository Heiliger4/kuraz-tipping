
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/navbar"
import ProfileTip from "./components/profile-tip"
import RatingComp from "./components/rating"
import { useAppStore } from "./store/appStore"
import { memo } from "react"

const App = memo(() => {
  // Optimized selector - only subscribe to currentRoute
  const currentRoute = useAppStore((state) => state.currentRoute)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      {currentRoute === 'home' && <ProfileTip />}
      {currentRoute === 'profile' && <RatingComp />}
    </ThemeProvider>
  )
})

App.displayName = 'App'

export default App