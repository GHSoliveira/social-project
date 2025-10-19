import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Createpost from "./pages/Createpost.jsx";
import Profile from "./pages/Profile.jsx";
import ChangePlan from "./pages/ChangePlan.jsx";

function App() {


  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path='/home' element={<Homepage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/post' element={<Createpost />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/plan+' element={<ChangePlan />} />
    </Routes>
  )
}

export default App
