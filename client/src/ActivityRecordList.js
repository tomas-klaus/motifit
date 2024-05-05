import React, { useContext, useState , useEffect} from "react";
import { ActivityRecordListContext } from "./ActivityRecordListContext";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

function ActivityRecordList() {
  const { activityRecordList } = useContext(ActivityRecordListContext);
  const { handlerMap } = useContext(ActivityRecordListContext);
  const { activityList } = useContext(ActivityListContext);

  const [disableButtons, setDisableButtons] = useState(false);
  
  useEffect(() => {
    // This effect does nothing but trigger a re-render when the state changes
  }, [activityRecordList]);

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
              <Button
                variant="danger"
                disabled={disableButtons}
                onClick={() => handleDelete(item.id)}
              >
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
