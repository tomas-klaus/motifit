import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import UserList from "./UserList";
import { Container, Row, Col, Card } from "react-bootstrap";

function MainPage() {
  const getDaysLeftInMonth = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return endOfMonth.getDate() - today.getDate();
  };

  const daysLeft = getDaysLeftInMonth();
  const dayText = daysLeft === 1 ? "day" : "days";

  return (
    <Container className="my-3">
      <UserInfo />

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center my-3">
            <Card.Header>Leaderboard</Card.Header>
            <Card.Body>
              <Card.Title>
                {daysLeft} {dayText} left
              </Card.Title>
              <Card.Text>Keep pushing to improve your rank!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <UserList />
    </Container>
  );
}

export default MainPage;
