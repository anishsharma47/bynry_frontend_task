import React, { Suspense, useState } from "react";
import MontserratFontTextComp from "../../components/common/custom_text/MontserratFontTextComp";
import WrapperComp from "../../components/common/WrapperComp";
import { userData } from "../../text_data/userData";
import TableComp from "../../components/modules/table/TableComp";
import { LiaEditSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import ButtonComp from "../../components/common/buttons/ButtonComp";
import { lazy } from "react";
import TextInputFieldComp from "../../components/common/input/TextInputFieldComp";
import {
  dangerMsg,
  getData,
  storeData,
  successMsg,
} from "../../utils/helperFunction";
import imagePath from "../../constants/imagePath";
import NoDataFoundComp from "../../components/modules/NoDataFoundComp";
const ModalComp = lazy(() => import("../../components/common/ModalComp"));

//TABLE HEADING DATA
const tableHeading = [
  { name: "user_img" },
  { name: "user_name" },
  { name: "user_location" },
  { name: "latitude" },
  { name: "longitude" },
  { name: "options" },
];

const loadProfiles = () => {
  const storedProfiles = getData("profiles");
  console.log("stored>>>>", storedProfiles);
  if (storedProfiles) {
    return storedProfiles;
  }
  return []; // Default to an empty array if no profiles exist in localStorage
};

const DashboardPage = () => {
  //STATE CONFIG
  const [modalVisibility, setModalVisibility] = useState({
    addProfileModalVisibility: false,
    updateProfileModalVisibility: false,
  });

  const [profiles, setProfiles] = useState(loadProfiles());

  console.log("profiles>>>", profiles);

  const [profileData, setProfileData] = useState({
    image: "",
    name: "",
    city: "",
    latitude: "",
    longitude: "",
    description: "",
  });

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

  function handleEdit(data) {
    // Directly update the profiles state
    setModalVisibility({
      ...modalVisibility,
      addProfileModalVisibility: false,
      updateProfileModalVisibility: true,
    });
    setProfileData({
      ...data,
    });
  }

  //HANDLE PROFILE UPDATES
  function handleUpdateProfile() {
    if (!handleValidation()) return;
    setProfiles((prevProfiles) => {
      const profileIndex = prevProfiles.findIndex(
        (item) => item.id === profileData.id
      );

      if (profileIndex !== -1) {
        const updatedProfiles = [...prevProfiles];
        updatedProfiles[profileIndex] = {
          ...updatedProfiles[profileIndex],
          ...profileData,
        };

        storeData("profiles", updatedProfiles);
        setModalVisibility({
          ...modalVisibility,
          addProfileModalVisibility: false,
          updateProfileModalVisibility: false,
        });

        return updatedProfiles;
      } else {
        console.log("Profile not found");
        return prevProfiles; // No change to profiles if not found
      }
    });
  }

  //HANDLE PROFILE DELETE
  function handleDelete(data) {
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== data.id
    );
    setProfiles(updatedProfiles);
    storeData("profiles", updatedProfiles);
    successMsg("Profile deleted successfully");
  }

  //HANDLE ADD PROFILE METHOD
  function handleAddProfile(e) {
    if (!handleValidation()) return;
    const newProfile = {
      id: Date.now(),
      ...profileData,
    };
    storeData("profiles", [...profiles, newProfile]);
    setProfiles([...profiles, newProfile]);

    setModalVisibility({
      ...modalVisibility,
      addProfileModalVisibility: false,
      updateProfileModalVisibility: false,
    });
    setProfileData({});
  }

  //RENDER TABLE ROW
  const renderRow = (item, index) => {
    return (
      <tr key={index} className={`bg-white`}>
        <td className={`px-4 py-4 border-b  text-sm `}>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden">
              <img
                className="w-full h-full "
                src={item.image ? item.image : imagePath.DEFAULT_IMG}
                alt="profile image"
              />
            </div>
          </div>
        </td>

        <td className={`px-4 py-4 border-b  text-sm `}>
          <p className=" whitespace-no-wrap font-MediumFont">{item?.name}</p>
        </td>

        <td className={`px-4 py-4 border-b  text-sm `}>
          <p className=" whitespace-no-wrap font-MediumFont">{item?.city}</p>
        </td>

        <td className={`px-4 py-4 border-b  text-sm `}>
          <p className=" whitespace-no-wrap font-MediumFont">
            {item?.latitude}
          </p>
        </td>

        <td className={`px-4 py-4 border-b  text-sm `}>
          <p className=" whitespace-no-wrap font-MediumFont">
            {item?.longitude}
          </p>
        </td>

        <td className={`px-4 py-4 border-b  text-sm flex items-center gap-2 `}>
          <LiaEditSolid
            size={30}
            onClick={() => handleEdit(item)}
            className={`bg-orange-300 text-gray-800 hover:text-orange  p-1 rounded-md cursor-pointer duration-default`}
          />
          <MdOutlineDelete
            size={30}
            onClick={() => handleDelete(item)}
            className={`bg-orange-300 text-red-600 hover:text-orange  p-1 rounded-md cursor-pointer duration-default`}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <WrapperComp className="">
        <div className="p-6 bg-white rounded-xl flex flex-col gap-5 ssm:flex-row justify-between items-start  ssm:items-center">
          <MontserratFontTextComp
            className="text-lg font-MontserratBold text-gray-800"
            text="All Profiles"
          />
          <ButtonComp
            onClick={() => {
              setModalVisibility({
                ...modalVisibility,
                addProfileModalVisibility: true,
                updateProfileModalVisibility: false,
              }),
                setProfileData({});
            }}
            className="max-w-fit"
            btnName="Add Profile"
          />
        </div>

        {profiles?.length > 0 ? (
          <TableComp
            tableHeading={tableHeading}
            tableData={profiles}
            renderRow={renderRow}
          />
        ) : (
          <div className="mt-10">
            <NoDataFoundComp />
          </div>
        )}
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

export default DashboardPage;
