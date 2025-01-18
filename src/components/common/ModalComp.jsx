import React from "react";
import { IoMdClose } from "react-icons/io";
import MontserratFontTextComp from "./custom_text/MontserratFontTextComp";

const ModalComp = ({
  children,
  visiblity = false,
  onModalClose = () => {},
  setModalVisibility = () => {},
  modalName = "modal name",
}) => {
  return (
    <div
      className={`w-full bg-black/50 h-screen flex justify-center items-center fixed top-0 left-0 z-[100] p-2 xs:p-4 ${
        visiblity ? "block" : "hidden"
      } `}
    >
      <div
        className={`w-full bg-gray-200 sm:min-w-[500px] sm:max-w-[500px] max-h-full    overflow-y-auto p-2 xs:p-6 rounded-lg `}
      >
        <div
          onClick={onModalClose}
          className={`flex justify-between border-b-2  pb-2 `}
        >
          <MontserratFontTextComp
            className={`text-gray-800 uppercase`}
            text={modalName}
          />
          <IoMdClose
            onClick={setModalVisibility}
            className="cursor-pointer hover:text-orange duration-default text-light_orange"
            size={20}
          />
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default ModalComp;
