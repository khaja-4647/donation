import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Info from "./pages/info/Info";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import AdminDashboard from "./pages/dashboard/AdminDashboard"; 
import Dashboard from "./pages/dashboard/Dashboard"; 
import ReceiverForm from "./pages/forms/receiver/ReceiverForm"; 
import DonorForm from "./pages/forms/donor/DonorForm";
import Home from "./pages/home/Home";  
import ProfilePage from "./pages/profile/ProfilePage";  
const App = () => {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/info" element={<Info />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/requestblood" element={<ReceiverForm />} />
          <Route path="/donate" element={<DonorForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      
    </Router>
  );
};




export default App;
