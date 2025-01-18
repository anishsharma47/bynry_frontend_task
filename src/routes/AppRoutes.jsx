import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBarComp from "../components/common/bars/navbar/NavBarComp";
import ScrollToTopComp from "../components/common/ScrollToTopComp";
import HomePage from "../pages/home/HomePage";
import ProfileDetailPage from "../pages/profile_detail/ProfileDetailPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { getData } from "../utils/helperFunction";
import ProfilePage from "../pages/profile/ProfilePage";

const AppRoutes = () => {
  const isAdmin = getData("isAdmin");

  //ROUTES CONFIG
  const routesData = [
    { path: "/", element: <HomePage /> },
    { path: "/profile-detail/:id", element: <ProfileDetailPage /> },
    { path: "/profile/:userId", element: <ProfilePage /> },
  ];

  const dashboardRouteData = [{ path: "/", element: <DashboardPage /> }];

  return (
    <Router>
      <ScrollToTopComp />
      {isAdmin ? (
        <>
          <NavBarComp lable="Admin Panel" />
          <Routes>
            {dashboardRouteData?.map((item, index) => (
              <Route key={index} path={item?.path} element={item?.element} />
            ))}
          </Routes>
        </>
      ) : (
        <>
          <NavBarComp />
          <Routes>
            {routesData?.map((item, index) => (
              <Route key={index} path={item?.path} element={item?.element} />
            ))}
          </Routes>
        </>
      )}
      {/* <FooterComp /> */}
    </Router>
  );
};

export default AppRoutes;
