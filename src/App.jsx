import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import CreateRecipe from "./pages/CreateRecipe"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./utils/ProtectedRoute"
import UserRecipes from "./pages/UserRecipes"
import LikedRecipes from "./pages/LikedRecipes"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
              </ProtectedRoute>
            } 
            />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          } />
          <Route path="/my-recipes" element={
            <ProtectedRoute>
              <UserRecipes />
            </ProtectedRoute>
          } />
          <Route path="/liked" element={
            <ProtectedRoute>
              <LikedRecipes />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
