import React, { useState, useEffect } from "react";
import { ProjectForm } from "../components/ProjectForm";
import { HwCheckoutForm } from "../components/HwCheckoutForm";
import HWButton from "../components/HWButton";
import { NewProject } from "../components/NewProject";
import { HwCheckinForm } from "../components/HwCheckinForm";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [goToLogin, setGoToLogin] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // 发送网络请求获取登录状态
    fetch("/user_info")
      .then((response) => response.json())
      .then((data) => {
        const isLoggedIn = data.isLoggedIn;
        setCurrentUser(data.username);
        // console.log(data);
        if (isLoggedIn) {
          console.log(goToLogin);
          // 如果已登录，则跳转到主页
        } else {
          setGoToLogin(true);
          // 如果未登录，可选择跳转到登录页面或其他操作
        }
      })
      .catch((error) => {
        setGoToLogin(true);
        // 可选择在请求失败时跳转到登录页面或其他操作
      });
  }, []);

  if (goToLogin) {
    return <Navigate to="/" />;
  }

  const handleLogout = async () => {
    try {
      // 发送注销请求至后端
      const response = await fetch("/logout", {
        method: "POST",
      });

      if (response.ok) {
        // 注销成功，跳转至登录页面
        console.log(response);
        navigate("/");
      } else {
        // 处理注销失败的情况
      }
    } catch (error) {
      console.error("注销请求失败:", error);
    }
  };

  return (
    <div className="col">
      <h1>Welcome to your Dashboard!</h1>
      <p>User: {currentUser}</p>
      <button onClick={handleLogout}>Sign Out</button>
      <hr></hr>

      <HWButton></HWButton>
      <h2>Check Project resource!</h2>
      <ProjectForm></ProjectForm>
      <hr></hr>
      <h2>Create Project!</h2>
      <NewProject></NewProject>
      <hr></hr>
      <h2>Hardware Resource Check Out!</h2>
      <HwCheckoutForm></HwCheckoutForm>
      <hr></hr>
      <h2>Hardware Resource Check In!</h2>
      <HwCheckinForm></HwCheckinForm>
    </div>
  );
}

export default Dashboard;
