import React, { lazy, useState, Suspense, useEffect } from "react";
import { userData } from "../../text_data/userData";
import UserProfileCard from "../../components/modules/cards/user_profile_card/UserProfileCard";
import WrapperComp from "../../components/common/WrapperComp";
import MontserratFontTextComp from "../../components/common/custom_text/MontserratFontTextComp";
import TextInputFieldComp from "../../components/common/input/TextInputFieldComp";
import { IoSearchOutline } from "react-icons/io5";
import NoDataFoundComp from "../../components/modules/NoDataFoundComp";
import {
  dangerMsg,
  getData,
  storeData,
  successMsg,
} from "../../utils/helperFunction";
import ButtonComp from "../../components/common/buttons/ButtonComp";
import { useNavigate } from "react-router-dom";
const ModalComp = lazy(() => import("../../components/common/ModalComp"));

const HomePage = () => {
  //HOOKS CONFIG
  const navigate = useNavigate();

  const storedProfiles = getData("profiles") || [];
  const currentUserId = "user1";
  const [isUser, setIsUser] = useState(false);

  //STATE CONFIG
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(storedProfiles);
  const [modalVisibility, setModalVisibility] = useState({
    addProfileModalVisibility: false,
    updateProfileModalVisibility: false,
  });
  const [profileData, setProfileData] = useState({
    image: "",
    name: "",
    city: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [profiles, setProfiles] = useState(storedProfiles);

  //HANDLE VALIDATION FUNCTION

  function handleValidation() {
    if (
      !profileData.description ||
      !profileData.name ||
      !profileData.city ||
      !profileData.latitude ||
      !profileData.longitude
    ) {
      dangerMsg(
        "Name,City,Latitude,Longitude and Description are required. Please fill out all the fields."
      );
      return false;
    }
    return true;
  }

  //HANDLE SERACH METHOD
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    //FILTER PROFILES BASED ON SERACH QUERY
    const filtered = profiles?.filter(
      (profile) =>
        profile.name.toLowerCase().includes(query) ||
        profile.city.toLowerCase().includes(query)
    );
    setFilteredProfiles(filtered);
  };

  const handleAddProfile = () => {
    if (!handleValidation()) return;
    const newProfile = {
      id: Date.now(),
      userId: currentUserId,
      ...profileData,
    };
    storedProfiles.push(newProfile);
    storeData("profiles", storedProfiles);
    successMsg("Profile added successfully");
    setModalVisibility({});
    setProfileData({});
    window.location.reload();
  };

  console.log(
    "uerid>>>>>>",
    storedProfiles?.findIndex((item, index) => item?.userId === currentUserId)
  );

  const isPresent = storedProfiles?.some(
    (item, index) => item?.userId === currentUserId
  );

  const MobileViewHeaderComp = () => {
    return (
      <div className=" w-full">
        <div className="flex flex-col xsm:flex-row justify-between gap-4 items-start xsm:items-center">
          <MontserratFontTextComp
            className="text-lg text-gray-800 font-MontserratSemiBold"
            text="User Profile List"
          />
          <div className="">
            {!isPresent && (
              <div className="min-w-full ssm:max-w-fit">
                <ButtonComp
                  onClick={() =>
                    setModalVisibility({
                      ...modalVisibility,
                      addProfileModalVisibility: true,
                      updateProfileModalVisibility: false,
                    })
                  }
                  btnName="Add Your Profile"
                />
              </div>
            )}
            {isPresent && (
              <div className="w-full ssm:max-w-fit">
                <ButtonComp
                  onClick={() => navigate(`/profile/${currentUserId}`)}
                  btnName="Go to Profile"
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full ">
          <TextInputFieldComp
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
            placeholder="search by name,city..."
            className={"w-full h-full"}
            lableName=""
          />

          <IoSearchOutline className="absolute text-2xl right-4 top-[40%] text-gray-800" />
        </div>
      </div>
    );
  };

  return (
    <div className=" bg-gray-100 min-h-screen w-full">
      <WrapperComp>
        <div className="py-10 space-y-5">
          <div className="md:block hidden">
            <div className="flex justify-between flex-wrap ssm:items-center w-full">
              <MontserratFontTextComp
                className="text-lg text-gray-800 font-MontserratSemiBold"
                text="User Profile List"
              />
              <div className="flex items-end flex-wrap gap-4 md:mt-0 mt-4">
                <div className="relative w-full ssm:w-[400px]">
                  <TextInputFieldComp
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                    placeholder="search by name,city..."
                    className={"w-full h-full"}
                    lableName=""
                  />

                  <IoSearchOutline className="absolute text-2xl right-4 top-[40%] text-gray-800" />
                </div>
                <div className="">
                  {!isPresent && (
                    <ButtonComp
                      onClick={() =>
                        setModalVisibility({
                          ...modalVisibility,
                          addProfileModalVisibility: true,
                          updateProfileModalVisibility: false,
                        })
                      }
                      className="max-w-fit"
                      btnName="Add Your Profile"
                    />
                  )}
                  {isPresent && (
                    <ButtonComp
                      onClick={() => navigate(`/profile/${currentUserId}`)}
                      className="max-w-fit"
                      btnName="Go to Profile"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden block">
            <MobileViewHeaderComp isPresent={isPresent} />
          </div>
          <div className="mt-4 space-y-5">
            {filteredProfiles?.length > 0 ? (
              filteredProfiles?.map((item, index) => (
                <UserProfileCard profileData={item} />
              ))
            ) : (
              <NoDataFoundComp query={searchQuery} />
            )}
          </div>
        </div>
      </WrapperComp>

      {/* MODAL COMPONENT */}
      <Suspense
        fallback={() => (
          <div className="h-screen w-full text-gray-800 font-MontserratBold">
            loading....
          </div>
        )}
      >
        <ModalComp
          setModalVisibility={setModalVisibility}
          modalName={
            modalVisibility.addProfileModalVisibility
              ? "Add Profile"
              : "Update Profile"
          }
          visiblity={
            modalVisibility.addProfileModalVisibility === true
              ? modalVisibility.addProfileModalVisibility
              : modalVisibility.updateProfileModalVisibility
          }
        >
          <dit className="space-y-3">
            <TextInputFieldComp
              value={profileData.image}
              onChange={(e) =>
                setProfileData({ ...profileData, image: e.target.value })
              }
              lableName="Profile"
              placeholder="enter image url"
            />
            <TextInputFieldComp
              required
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              placeholder="enter name..."
              lableName="User Name"
            />
            <TextInputFieldComp
              required
              value={profileData.description}
              onChange={(e) =>
                setProfileData({ ...profileData, description: e.target.value })
              }
              placeholder="enter description..."
              lableName="Description"
            />
            <TextInputFieldComp
              required
              value={profileData.city}
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
              placeholder="enter city..."
              lableName="City"
            />
            <TextInputFieldComp
              type="number"
              required
              onChange={(e) =>
                setProfileData({ ...profileData, latitude: e.target.value })
              }
              value={profileData.latitude}
              placeholder="enter latitude..."
              lableName="Latitude"
            />
            <TextInputFieldComp
              type="number"
              required
              onChange={(e) =>
                setProfileData({ ...profileData, longitude: e.target.value })
              }
              value={profileData.longitude}
              placeholder="enter longitude..."
              lableName="Longitude"
            />
            <ButtonComp
              onClick={() =>
                modalVisibility.addProfileModalVisibility
                  ? handleAddProfile()
                  : handleUpdateProfile()
              }
              className="mt-5"
              btnName={
                modalVisibility.addProfileModalVisibility
                  ? "Add Profile"
                  : "Update Profile"
              }
            />
          </dit>
        </ModalComp>
      </Suspense>
    </div>
  );
};

export default HomePage;
