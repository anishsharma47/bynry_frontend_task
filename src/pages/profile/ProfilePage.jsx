import React, { lazy, Suspense, useId, useState } from "react";
import { getData, storeData, successMsg } from "../../utils/helperFunction";
import { useNavigate, useParams } from "react-router-dom";
import imagePath from "../../constants/imagePath";
import MontserratFontTextComp from "../../components/common/custom_text/MontserratFontTextComp";
import WrapperComp from "../../components/common/WrapperComp";
import ButtonComp from "../../components/common/buttons/ButtonComp";
import TextInputFieldComp from "../../components/common/input/TextInputFieldComp";
const ModalComp = lazy(() => import("../../components/common/ModalComp"));

const ProfilePage = () => {
  //HOOK'S CONFIG
  const { userId } = useParams();
  const navigate = useNavigate();

  //STATES COFIG
  const [profiles, setProfiles] = useState(getData("profiles") || 0);
  const profileDetail = profiles?.filter(
    (item, index) => item.userId === userId
  );
  const [profileData, setProfileData] = useState({
    image: profileDetail[0].image,
    name: profileDetail[0].name,
    city: profileDetail[0].city,
    latitude: profileDetail[0].latitude,
    longitude: profileDetail[0].longitude,
    description: profileDetail[0].description,
  });
  const [modalVisibility, setModalVisibility] = useState(false);

  //HANDLE VALIDATION
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

  //HANDLE PROFILE UPDATES
  function handleUpdateProfile() {
    if (!handleValidation()) return;
    setProfiles((prevProfiles) => {
      const profileIndex = prevProfiles.findIndex(
        (item) => item.userId === userId
      );

      if (profileIndex !== -1) {
        const updatedProfiles = [...prevProfiles];
        updatedProfiles[profileIndex] = {
          ...updatedProfiles[profileIndex],
          ...profileData,
        };

        storeData("profiles", updatedProfiles);
        setModalVisibility(false);

        return updatedProfiles;
      } else {
        console.log("Profile not found");
        return prevProfiles; // No change to profiles if not found
      }
    });
  }

  //HANDLE PROFILE DELETE
  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const updatedProfiles = profiles.filter(
        (profile) => profile.userId !== userId
      );
      setProfiles(updatedProfiles);
      storeData("profiles", updatedProfiles);
      successMsg("Profile deleted successfully");
      navigate("/");
    } else {
      navigate("/");
      console.log("Deletion cancelled");
    }
  }

  console.log("prodetail>>>>>", profileDetail);

  return (
    <div className="bg-gray-200 h-screen">
      <WrapperComp>
        <div className="grid place-content-center h-[80vh] w-full">
          <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div class="rounded-t-lg h-32 overflow-hidden">
              <img
                class="object-cover object-top w-full"
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Mountain"
              />
            </div>
            <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <img
                class="object-cover object-center h-32"
                src={
                  profileDetail[0]?.image
                    ? profileDetail[0].image
                    : imagePath.DEFAULT_IMG
                }
                alt="Woman looking front"
              />
            </div>
            <div class="text-center mt-2">
              <h2 class="font-semibold">{profileDetail[0]?.name}</h2>
              <p class="text-gray-500">{profileDetail[0]?.description}</p>
            </div>
            <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
              <li class="flex flex-col items-center justify-around">
                <svg
                  class="w-4 fill-current text-blue-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <div>2k</div>
              </li>
              <li class="flex flex-col items-center justify-between">
                <svg
                  class="w-4 fill-current text-blue-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                </svg>
                <div>10k</div>
              </li>
              <li class="flex flex-col items-center justify-around">
                <svg
                  class="w-4 fill-current text-blue-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                </svg>
                <div>15</div>
              </li>
            </ul>
            <div class="p-4 flex gap-3 border-t mx-8 mt-2">
              <ButtonComp
                onClick={() => setModalVisibility(true)}
                btnName="Edit"
              />
              <ButtonComp
                onClick={() => handleDelete()}
                className="bg-red-600"
                btnTextStyle="text-white"
                btnName="Delete"
              />
            </div>
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
          setModalVisibility={() => setModalVisibility(false)}
          modalName={"Update Profile"}
          visiblity={modalVisibility}
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
              onClick={() => handleUpdateProfile()}
              className="mt-5"
              btnName={"Update Profile"}
            />
          </dit>
        </ModalComp>
      </Suspense>
    </div>
  );
};

export default ProfilePage;
