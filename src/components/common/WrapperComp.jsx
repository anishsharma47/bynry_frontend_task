import React from "react";

const WrapperComp = ({ children, className = {} }) => {
  return (
    <div
      className={`w-full relative  ssm:max-w-[568px] md:max-w-[768px] smlg:max-w-[992px] lg:max-w-[1024px] xl:max-w-[1280px] xxl:max-w-[1440px] mx-auto px-5 xxl:px-28  ${className} !important`}
    >
      {children}
    </div>
  );
};

export default WrapperComp;
