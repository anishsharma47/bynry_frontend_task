import React from "react";

const ClashGroteskFontTextComp = ({
  className = "",
  text = "",
  color = "text-pink_color-900",
  leading = "leading-none",
  textFont = "font-ClashGroteskRegular",
}) => {
  return (
    <div className={`${textFont} ${leading}  ${color} ${className}`}>
      {text}
    </div>
  );
};

export default ClashGroteskFontTextComp;
