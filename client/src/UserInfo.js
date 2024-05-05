import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
//import { UserRankContext } from './UserRankContext';
import { UserListContext } from "./UserListContext";
import { Container, Row, Col, Table, Alert } from "react-bootstrap";

function UserInfo() {
  const { loggedInUser,userData } = useContext(UserContext);
  //const { userRank } = useContext(UserRankContext);
  const { userList, handlerMap } = useContext(UserListContext);
  //console.log(userList);

  useEffect(() => {
    handlerMap.handleLoad();
  }, [userData]);

  let formattedRank = "User not logged in";
  let points=0
  if (loggedInUser !== null) {
    const index = userList.findIndex((user) => user.id === loggedInUser.id)
    const user = userList.find((user) => user.id === loggedInUser.id);
    points=user.points
    
    formattedRank = formatRank(index + 1); // Adjust index for human-readable format (1-based index)
  }
  
  function formatRank(index) {
    if (!index) return null; // Handle null
    const lastDigit = index % 10;
    const lastTwoDigits = index % 100;

    if (lastTwoDigits > 10 && lastTwoDigits < 14) {
      return index + "th";
    }
    switch (lastDigit) {
      case 1:
        return index + "st";
      case 2:
        return index + "nd";
      case 3:
        return index + "rd";
      default:
        return index + "th";
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          {loggedInUser === null ? (
            <Alert variant="danger">Please log in</Alert>
          ) : (
            <div>
              <h4 className="mb-4">Rank</h4>
              <Table bordered>
                <tbody>
                  <tr>
                    <td className="text-center">Rank</td>
                    <td className="text-center">Points</td>
                  </tr>
                  <tr>
                    <td className="text-center">{formattedRank}</td>
                    <td className="text-center">{points}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
