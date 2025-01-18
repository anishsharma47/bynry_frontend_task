import React from "react";
import LocationComp from "../../components/modules/location/LocationComp";
import WrapperComp from "../../components/common/WrapperComp";
import { useParams } from "react-router-dom";
import { userData } from "../../text_data/userData";
import MontserratFontTextComp from "../../components/common/custom_text/MontserratFontTextComp";
import { getData } from "../../utils/helperFunction";
import imagePath from "../../constants/imagePath";

const ProfileDetailPage = () => {
  const profiles = getData("profiles");
  const { id } = useParams();

  const userDetail = profiles?.filter((item, index) => item?.id === Number(id));
  const info = userDetail[0];

  return (
    <div className="bg-gray-100">
      <WrapperComp>
        <div className="pt-5">
          {/* LOCATION SECTION */}
          <div className=" overflow-hidden p-4 bg-white rounded-xl">
            <LocationComp latitude={info.latitude} longitude={info.longitude} />
          </div>

          {/* PROFILE INFO SECTION */}
          <div className=" py-5 rounded-xl">
            <div className="bg-white flex gap-5 p-4">
              <div className="w-40 h-40 rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={info?.image ? info?.image : imagePath.DEFAULT_IMG}
                  alt="user image"
                />
              </div>
              <div className="space-y-4">
                <div className="">
                  <MontserratFontTextComp
                    className="font-MontserratBold text-xl"
                    text="Name"
                  />
                  <MontserratFontTextComp
                    className="text-md"
                    text={info?.name}
                  />
                </div>

                <div className="">
                  <MontserratFontTextComp
                    className="font-MontserratBold text-xl"
                    text="city"
                  />
                  <MontserratFontTextComp
                    className="text-md"
                    text={info?.city}
                  />
                </div>

                <div>
                  <MontserratFontTextComp
                    className="font-MontserratBold text-xl"
                    text="Email"
                  />
                  <MontserratFontTextComp
                    className="text-md"
                    text={info?.email}
                  />
                </div>
                <div>
                  <MontserratFontTextComp
                    className="font-MontserratBold text-xl"
                    text="Description"
                  />
                  <MontserratFontTextComp
                    className="text-md"
                    text={info?.description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperComp>
    </div>
  );
};

export default ProfileDetailPage;
