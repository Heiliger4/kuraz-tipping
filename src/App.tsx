
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/navbar"
import ProfileTip from "./components/profile-tip"
import RatingComp from "./components/rating"
import { useRouteStore } from "./store/routeStore"

function App() {
  const { currentRoute } = useRouteStore()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      {currentRoute === 'home' && <ProfileTip />}
      {currentRoute === 'profile' && <RatingComp />}
    </ThemeProvider>
  )
}

export default App