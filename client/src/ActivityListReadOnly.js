import React, { useContext } from "react";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup } from "react-bootstrap";

function ActivityListReadOnly() {
  const { activityList } = useContext(ActivityListContext);

  return (
    <div className="container">
      <h1>Activity List</h1>
      <ListGroup>
        {activityList.map((activity) => (
          <ListGroup.Item key={activity.id}>
            {activity.name} - PPM: {activity.points}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ActivityListReadOnly;
