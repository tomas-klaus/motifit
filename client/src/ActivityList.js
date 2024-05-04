import React, { useContext, useState } from "react";
import { ActivityListContext } from "./ActivityListContext";
import { ListGroup, Collapse, Form, Button } from "react-bootstrap";

function ActivityList() {
  const { activityList } = useContext(ActivityListContext);
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
      ...prevOpen,
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
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration in minutes</Form.Label>
                    <Form.Control type="number" placeholder="Enter duration" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Activity</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        formData[activity.id] ? formData[activity.id].date : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [activity.id]: {
                            ...formData[activity.id],
                            date: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Button variant="primary">Record</Button>
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
