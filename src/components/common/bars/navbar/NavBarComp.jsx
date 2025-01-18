import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import WrapperComp from "../../WrapperComp";
import MontserratFontTextComp from "../../custom_text/MontserratFontTextComp";
import ButtonComp from "../../buttons/ButtonComp";
import { getData, storeData } from "../../../../utils/helperFunction";

const NavBarComp = ({ lable = "GeoProfile Explorer" }) => {
  //HOOK CONFIG
  const navigate = useNavigate();
  const isAdmin = getData("isAdmin");

  function handleLogin() {
    if (isAdmin) {
      storeData("isAdmin", false);
      navigate("/");
    } else {
      storeData("isAdmin", true);
      navigate("/");
    }
    window.location.reload();
  }

  return (
    <div className={" py-5 shadow-md"}>
      <WrapperComp>
        <div className="py-5 flex justify-between items-center ">
          {/* LOGO SECTION */}
          <div onClick={() => navigate("/")}>
            <MontserratFontTextComp
              textFont="font-MontserratBold"
              className=" text-gray-800  text-xl cursor-pointer "
              text={lable}
            />
          </div>

          <div>
            <ButtonComp
              onClick={() => handleLogin()}
              btnName={isAdmin ? "logout" : "login"}
            />
          </div>
        </div>
      </WrapperComp>
    </div>
  );
};

export default NavBarComp;
