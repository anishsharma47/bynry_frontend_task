import React from "react";
import MontserratFontTextComp from "../custom_text/MontserratFontTextComp";

const TextInputFieldComp = ({
  lableName = "Lable Name",
  placeholder = "Placeholder....",
  type = "text",
  className = {},
  onChange = () => {},
  value = "",
  required = false,
  inputStyle = " border-none",
}) => {
  return (
    <div className={[`w-full ${className} `]}>
      <MontserratFontTextComp
        textFont="font-ClashGroteskRegular"
        className={"text-md mb-2 text-[#344054] text-[16px]"}
        text={lableName}
      />
      <input
        required={required}
        value={value}
        onChange={onChange}
        className={` outline-none bg-white  w-full px-3 h-[48px]   text-sm rounded-xl text-[#667085] font-MontserratMedium  ${inputStyle}`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default TextInputFieldComp;
