import React from "react";

const MontserratFontTextComp = ({
  className = "",
  text = "",
  children = "",
  textFont = "font-MontserratRegular",
  color = "",
  leading = "leading-none",
}) => {
  return (
    <div className={`${textFont} ${leading}  ${color} ${className}`}>
      {children != "" ? children : text}
    </div>
  );
};

export default MontserratFontTextComp;
