import React from "react";
import MontserratFontTextComp from "../common/custom_text/MontserratFontTextComp";
import ButtonComp from "../common/buttons/ButtonComp";

const NoDataFoundComp = ({ query = "" }) => {
  return (
    <div className="flex items-center justify-center w-full h-64 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <div className="flex items-center gap-2 capitalize text-center justify-center">
          {query !== "" && (
            <span className="text-xl text-gray-800 font-MontserratBold">
              '{query}'
            </span>
          )}{" "}
          <MontserratFontTextComp
            className="text-xl text-gray-800"
            text={`No Data Found`}
          />
        </div>
        <MontserratFontTextComp
          className="text-gray-500 mt-2"
          text="Sorry, we couldn't find any matching results."
        />
        <ButtonComp
          className="mt-10"
          onClick={() => window.location.reload()}
          btnName="Refresh"
        />
      </div>
    </div>
  );
};

export default NoDataFoundComp;
