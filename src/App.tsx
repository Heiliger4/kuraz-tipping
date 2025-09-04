
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/navbar"
import ProfileTip from "./components/profile-tip"
import RatingComp from "./components/rating"
import { memo } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = memo(() => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProfileTip />} />
          <Route path="/profile" element={<RatingComp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
})

App.displayName = 'App'

export default App