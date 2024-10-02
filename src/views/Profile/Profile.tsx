import Tabs from "../Marketplace/component/Tabs";
import Collectibles from "./component/Collectibles";
import PersonalDetails from "./component/PersonalDetails";

const Profile = () => {
  const tabData = [
    { label: "Profile Details", component: <PersonalDetails /> },
    { label: "Collectibles", component: <Collectibles /> },
    // Add more tabs here as needed
  ];

  return (
    <>
      {/* Add more tabs here as needed */}
      <Tabs tabData={tabData} />
    </>
  );
};

export default Profile;
