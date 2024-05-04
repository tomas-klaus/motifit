import React, { useContext } from "react";
import { UserContext } from "./UserContext";

import UserInfo from "./UserInfo";
import ActivityRecordList from "./ActivityRecordList";

function UserProfile() {
  const { loggedInUser } = useContext(UserContext);

  // Check if the user is logged in
  if (!loggedInUser) {
    // If no user is logged in, display a sign-in prompt
    return (
      <div className="container">
        <h1>Please log in</h1>
      </div>
    );
  }

  // If user is logged in, display user information and activity records
  return (
    <div className="container">
      <div>
        <h1>{loggedInUser.username}</h1>
      </div>
      <div>
        <UserInfo />
      </div>
      <ActivityRecordList />
    </div>
  );
}

export default UserProfile;
