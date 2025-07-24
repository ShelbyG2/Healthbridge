
import DarkModeToggle from "./components/DarkModeToggle"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function App() {
  
  

  return (
    <div className="App w-screen">
      <DarkModeToggle />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App


    

