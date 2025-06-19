import Register from "./pages/Register"
import Home from "./pages/Home"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./utils/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
              </ProtectedRoute>
            } 
            />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
