import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);

  return (
    <div className="relative text-center overflow-hidden max-w-7xl mx-auto mt-6">
      <h1>hello from the profile</h1>
      <h2>{user.email}</h2>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
    </div>
  );
};

export default Profile;
