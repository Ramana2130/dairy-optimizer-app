import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard";
import AddUser from "./Pages/AddUser";
import Users from "./Pages/Users";
import History from "./Pages/History";
import AdminRegisterForm from "./Pages/AdminRegister";
import AdminLogin from "./Pages/AdminLogin";
import UserDahboard from "./Pages/UserDashboard";
import { isAuthenticated } from "./utils/authUtils";
import StatementForm from "./Pages/StatementForm";
import UpdateUsers from "./Pages/UpdatedUsers";
import AdminProfile from "./Pages/AdminProfile";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import Salary from "./Pages/Salary";
import WayToLogin from "./Pages/WayToLogin";
import About from "./Pages/About";
import UserStatement from "./Pages/UserStatement";
import ConsumerDetails from "./Pages/ConsumerDetails";
import IncomeUser from "./Pages/IncomeUser";
import UserProfile from "./Pages/UserProfile";

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/adminlogin" replace />;
};

const CustomerPrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/waytologin" element={<WayToLogin />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="adminregister"element={<AdminRegisterForm />} />
          <Route path="/userstatement/:customerId" element={<UserStatement />} />
          <Route path="/consumerdetails/:customerId" element={<ConsumerDetails />} />
          <Route path="/incomeuser/:customerId" element={<IncomeUser />} />
          <Route path="/userprofile/:customerId" element={<UserProfile />} />
          

          <Route path="/userdashboard/:customerId" element={<CustomerPrivateRoute element={<UserDahboard />} />}></Route>
          {/* admin routes */}
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="/:userId/users" element={<Users />}></Route>
          <Route path="/updateuser/:userId/:customerId" element={<UpdateUsers />}></Route>
          <Route path="/adduser/:userId" element={<AddUser />}></Route>
          <Route path="/:userId/salary" element={<Salary />}></Route>
          <Route
            path="/admindashboard/:userId"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
          <Route path="/history/:userId" element={<History />} />
          <Route path="/profile/:userId" element={<AdminProfile />} />
          <Route
            path="/statementform/:userId/:customerId"
            element={<StatementForm />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
