import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import ActivityListReadOnly from "./ActivityListReadOnly";
import ActivityListInteractive from "./ActivityListInteractive";

function ActivityList() {
  const { loggedInUser } = useContext(UserContext);

  return loggedInUser ? <ActivityListInteractive /> : <ActivityListReadOnly />;
}

export default ActivityList;
