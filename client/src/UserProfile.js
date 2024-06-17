import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Container, Row, Col, Table, Alert } from "react-bootstrap";

import UserInfo from "./UserInfo";
import ActivityRecordList from "./ActivityRecordList";
import { ActivityRecordListContext } from "./ActivityRecordListContext";


function UserProfile() {
  const { loggedInUser, userHandlerMap } = useContext(UserContext);
  const { handlerMap } = useContext(ActivityRecordListContext);

  useEffect(() => {
    userHandlerMap.handleLoad();
    console.log("useEffect in UserProfile");
    if (loggedInUser && loggedInUser.id) {
      handlerMap.handleLoad(loggedInUser.id);
      console.log("useEffect in ActivityRecordList");
    }
  }, []);

  // Check if the user is logged in
  if (!loggedInUser) {
    // If no user is logged in, display a sign-in prompt
    return (
      <div className="container">
        <Alert variant="danger">Please log in</Alert>
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
