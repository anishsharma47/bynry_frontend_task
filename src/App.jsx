import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import "../src/styles/index.css";
import { getData, storeData } from "./utils/helperFunction";
import { userData } from "./text_data/userData";
import { Toaster } from "react-hot-toast";

const App = () => {
  const profiles = getData("profiles");
  console.log("profie>>>>>", profiles);

  useEffect(() => {
    if (!profiles || profiles.length === 0) {
      storeData("profiles", userData);
    }
  }, []);

  return (
    <React.StrictMode>
      <AppRoutes />
      <Toaster position="top-center" />
    </React.StrictMode>
  );
};

export default App;
