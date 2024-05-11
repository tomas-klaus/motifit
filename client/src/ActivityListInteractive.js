import React, { useContext, useState } from "react";
import { ActivityRecordListContext } from "./ActivityRecordListContext";
import { UserContext } from "./UserContext";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup, Collapse, Form, Button, Modal } from "react-bootstrap";

function ActivityListInteractive() {
  const { activityList } = useContext(ActivityListContext);
  const { handlerMap } = useContext(ActivityRecordListContext);
  const { loggedInUser, userHandlerMap } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [showAnimation, setShowAnimation] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const formatDate = (date) => {
    let d = new Date(date);
    return [
      d.getFullYear(),
      (d.getMonth() + 1).toString().padStart(2, "0"),
      d.getDate().toString().padStart(2, "0"),
    ].join("-");
  };

  const toggleOpen = (id) => {
    setOpen((prevOpen) => ({
      [id]: !prevOpen[id],
    }));
    setFormData((prevFormData) => ({
      [id]: {
        ...prevFormData[id],
        date: prevFormData[id]?.date || formatDate(new Date()),
      },
    }));
  };

  const handleSubmit = async (activityId, e) => {
    e.preventDefault();
    const currentDateTime = new Date();
    let data = new FormData(e.target);
    let dtoIn = Object.fromEntries(data);
    dtoIn.duration = Number(dtoIn.duration);

    const additionalData = {
      userID: loggedInUser.id,
      activityID: activityId,
      points:
        activityList.find((a) => a.id === activityId).points * dtoIn.duration,
      timestamp: currentDateTime.toISOString(),
    };

    try {
      setShowAnimation(true);
      setShowLoading(true);
      setTimeout(() => setShowAnimation(false), 15000);
      setTimeout(() => setShowLoading(false), 15000);
      await handlerMap.handleCreate({ ...dtoIn, ...additionalData });
      await userHandlerMap.handleUpdate({
        id: loggedInUser.id,
        points: additionalData.points,
      });
      setOpen({});
    } catch (e) {
      console.error(e);
    }
  };

  function handleDateChange(activityId, event) {
    const newDate = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [activityId]: {
        ...prevFormData[activityId],
        date: newDate,
      },
    }));
  }

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
                  onSubmit={(e) => (
                    handleSubmit(activity.id, e), toggleOpen(activity.id)
                  )}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Duration in minutes</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter duration"
                      name="duration"
                      required
                      min="1"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Activity</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData[activity.id]?.date || ""}
                      onChange={(e) => handleDateChange(activity.id, e)}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={showLoading}
                  >
                    {showLoading
                      ? "Recording activity, please wait."
                      : "Record"}
                  </Button>
                </Form>
              </div>
            </Collapse>
          </React.Fragment>
        ))}
      </ListGroup>
      <Modal
        show={showAnimation}
        onHide={() => setShowAnimation(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Recording activity. Good job!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src="https://i.gifer.com/7plp.gif"
            alt="Loading Animation"
            justify-content="center"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ActivityListInteractive;
