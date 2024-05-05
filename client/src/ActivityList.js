import React, { useContext, useState } from "react";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup, Collapse, Form, Button } from "react-bootstrap";
import { ActivityRecordListContext } from "./ActivityRecordListContext";
import { UserContext } from "./UserContext";
// import { UserListContext } from "./UserListContext";
function ActivityList() {
  const { activityList } = useContext(ActivityListContext);
  const { handlerMap } = useContext(ActivityRecordListContext);
  const { loggedInUser, userHandlerMap } = useContext(UserContext);

  const [open, setOpen] = useState({});
  const [formData, setFormData] = useState({});
  

  // Function to format today's date in YYYY-MM-DD format
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // Toggle visibility and set default date
  const toggleOpen = (id) => {
    setOpen((prevOpen) => ({
      // ...prevOpen,
      [id]: !prevOpen[id],
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: {
        ...prevFormData[id],
        date:
          prevFormData[id] && prevFormData[id].date
            ? prevFormData[id].date
            : formatDate(new Date()),
      },
    }));
  };

  return (
    <div className="container">
      <h1>Activity List</h1>
      <ListGroup>
        {activityList.map((activity) => (
          <React.Fragment key={activity.id}>
            <ListGroup.Item
              action
              onClick={() => toggleOpen(activity.id)}
              aria-controls={`collapse-form-${activity.id}`}
              aria-expanded={open[activity.id]}
            >
              {activity.name} - PPM: {activity.points}
            </ListGroup.Item>
            <Collapse in={open[activity.id]}>
              <div id={`collapse-form-${activity.id}`} className="m-2">
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const currentDateTime = new Date();
                    var formData = new FormData(e.target);
                    //
                    let dtoIn = Object.fromEntries(formData);
                    dtoIn.duration = Number(dtoIn.duration);
                    const additionalData = {
                      userID: loggedInUser.id,
                      activityID: activity.id,
                      points:
                        activity.points *
                        (dtoIn.duration),
                      timestamp: currentDateTime.toISOString(),
                    };
                    const fullFormData = {
                      ...dtoIn,
                      ...additionalData, // Add extra data
                    };
                    try {
                      await handlerMap.handleCreate(fullFormData);
                      await userHandlerMap.handleUpdate({
                        id: loggedInUser.id,
                        points: additionalData.points,
                      });
                      console.log(loggedInUser.points);
                      console.log(additionalData.points);
                      setOpen(false);
                    } catch (e) {
                      console.log(e);
                      
                    }
                    // console.log(fullFormData);
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Duration in minutes</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter duration"
                      name="duration"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Activity</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={
                        formData[activity.id] ? formData[activity.id].date : ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [activity.id]: {
                            ...formData[activity.id],
                            date: e.target.value,
                          },
                        });
                      }}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Record
                  </Button>
                </Form>
              </div>
            </Collapse>
          </React.Fragment>
        ))}
      </ListGroup>
    </div>
  );
}

export default ActivityList;
