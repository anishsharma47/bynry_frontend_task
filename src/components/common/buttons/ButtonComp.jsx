import React from "react";
import MontserratFontTextComp from "../custom_text/MontserratFontTextComp";

const ButtonComp = ({
  btnName = "Button",
  disabled = true,
  className = "",
  onClick = () => {},
  isLoading = false,
  type = "button",
  btnTextStyle = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-300 grid  cursor-pointer  rounded-md  group duration-200  hover:shadow-sm place-content-center w-full h-fit px-4 py-3   ${className} !important`}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-b-0 border-l-0   border-white rounded-full animate-spin"></div>
      ) : (
        <MontserratFontTextComp
          text={btnName}
          className={`text-gray-800  px-4 ${btnTextStyle}`}
        />
      )}
    </button>
  );
};

export default ButtonComp;
