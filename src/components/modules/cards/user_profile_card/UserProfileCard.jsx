import { Link, useNavigate } from "react-router-dom";
import MontserratFontTextComp from "../../../common/custom_text/MontserratFontTextComp";
import { FaMapMarkedAlt } from "react-icons/fa";
import ButtonComp from "../../../common/buttons/ButtonComp";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import imagePath from "../../../../constants/imagePath";

const UserProfileCard = ({ profileData = {} }) => {
  //HOOK'S CONFIG
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/profile-detail/${profileData?.id}`)}
      className="  bg-white shadow-sm rounded-lg p-4 w-full border"
    >
      <div className="cursor-pointer flex items-center space-x-3">
        <img
          src={profileData?.image ? profileData?.image : imagePath.DEFAULT_IMG}
          alt="image"
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
        <div className="ml-4">
          <MontserratFontTextComp
            className="text-lg font-MontserratBold text-gray-800 "
            text={profileData?.name}
          />
          <MontserratFontTextComp
            className="text-sm  text-gray-500 mt-2"
            text={profileData?.city}
          />
          <MontserratFontTextComp
            className="text-sm font-MontserratSemiBold text-gray-800 mt-2"
            text={profileData?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
