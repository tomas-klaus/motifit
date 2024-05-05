import React, { useContext, useEffect } from "react";
import { UserListContext } from "./UserListContext";
import { Container, Row, Col, Table } from "react-bootstrap"; // Import necessary components

function UserList() {
  const { userList } = useContext(UserListContext);

  // useEffect(() => {
  //   handlerMap.handleLoad();
  // }, [userList]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {" "}
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserList;
