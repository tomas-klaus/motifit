import React, { useContext, useState, useEffect } from "react";
import { ActivityRecordListContext } from "./ActivityRecordListContext";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { UserContext } from "./UserContext";

function ActivityRecordList() {
  const { activityRecordList } = useContext(ActivityRecordListContext);
  const { handlerMap } = useContext(ActivityRecordListContext);
  const { activityList } = useContext(ActivityListContext);
  const { loggedInUser, userHandlerMap } = useContext(UserContext);

  const [disableButtons, setDisableButtons] = useState(false);

  // useEffect(() => {
  //   if (loggedInUser && loggedInUser.id) {
  //     handlerMap.handleLoad(loggedInUser.id);
  //     console.log("useEffect in ActivityRecordList");
  //   }
  // }, []);

  function getActivityNameById(activityID) {
    const activity = activityList.find(
      (activity) => activity.id === activityID
    );
    return activity ? activity.name : "Unknown Activity";
  }

  const handleDelete = (id) => {
    setDisableButtons(true);
    handlerMap.handleDelete(id);
    setTimeout(() => {
      setDisableButtons(false);
    }, 500); // Disable for 0.5 seconds
  };

  let helper = [];
  return (
    <div>
      <h2>History</h2>
      {activityRecordList.length > 0 ? (
        <ListGroup>
          {activityRecordList.map(
            (item) =>
              !helper.includes(item.id) && (
                <ListGroupItem
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {helper.unshift(item.id)}
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
                  <Button
                    variant="danger"
                    disabled={disableButtons}
                    onClick={() => {
                      handleDelete(item.id);
                      userHandlerMap.handleUpdate({
                        id: loggedInUser.id,
                        points: -item.points,
                      });
                      //handlerMap.handleLoad(loggedInUser.id)
                      //userHandlerMap.handleLoad();
                    }}
                  >
                    Delete
                  </Button>
                </ListGroupItem>
              )
          )}
        </ListGroup>
      ) : (
        <div>No activities recorded yet.</div>
      )}
    </div>
  );
}

export default ActivityRecordList;
