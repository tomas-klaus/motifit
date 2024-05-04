import React, { useContext } from "react";
import { ActivityRecordListContext } from "./ActivityRecordListContext";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap"; // Import Button from react-bootstrap

function ActivityRecordList() {
  const { activityRecordList, deleteActivityRecord } = useContext(
    ActivityRecordListContext
  );
  const { handlerMap } = useContext(ActivityRecordListContext);
  const { activityList } = useContext(ActivityListContext);

  function getActivityNameById(activityID) {
    const activity = activityList.find(
      (activity) => activity.id === activityID
    );
    return activity ? activity.name : "Unknown Activity";
  }

  // function handleDelete(id) {
  //   // Assume deleteActivityRecord is a method provided by the context to delete a record
  //   deleteActivityRecord(id);
  // }

  return (
    <div>
      <h2>History</h2>
      {activityRecordList.length > 0 ? (
        <ListGroup>
          {activityRecordList.map((item) => (
            <ListGroupItem
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Activity:</strong>{" "}
                {getActivityNameById(item.activityID)}
                <br />
                <strong>Date:</strong>{" "}
                {new Date(item.date).toLocaleDateString()}
                <br />
                <strong>Duration:</strong> {item.duration} min
                <br />
                <strong>Points:</strong> {item.points} pts
              </div>
              <Button variant="danger" onClick={() => handlerMap.handleDelete(item.id)}>
                Delete
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <div>No activities recorded yet.</div>
      )}
    </div>
  );
}

export default ActivityRecordList;
