import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/top/Login";
import Logout from "./components/top/Logout";
import Main from "./components/top/Main";
import Signup from "./components/top/Signup";
import SignupSuccess from "./components/top/SignupSuccess";
import Top from "./components/top/Top";
import UserDelete from "./components/top/UserDelete";
import UserDeleteSuccess from "./components/top/UserDeleteSuccess";
import UserUpdate from "./components/top/UserUpdate";
import UserUpdateSuccess from "./components/top/UserUpdateSuccess";
import ErrorPage from "./error/ErrorPage";
import FormSlide from "./components/contents/maincontent/formslide/FormSlide";
import PostContents from "./components/contents/maincontent/postcontents/PostContents";
import ActivationMail from "./function/ActivationMail";

function App() {
  return (
    <Router>
      <div className="app h-screen w-screen">
        <Routes>
          {/* <Route path="/" element={<Top />} /> */}
          <Route path="/" element={<Login />} />
          <Route
            path="/main"
            element={<Main displayType="form" slide={<FormSlide />} />}
          />
          <Route
            path="/history"
            element={<Main displayType="past" slide={<PostContents />} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/success" element={<SignupSuccess />} />
          <Route path="/activate/:uid/:token" element={<ActivationMail />} />
          <Route path="/userupdate" element={<UserUpdate />} />
          <Route path="/userupdate/success" element={<UserUpdateSuccess />} />
          <Route path="/userdelete" element={<UserDelete />} />
          <Route path="/userdelete/success" element={<UserDeleteSuccess />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
