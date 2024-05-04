import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { UserRankContext } from './UserRankContext';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';

function UserInfo() {
  const { loggedInUser } = useContext(UserContext);
  const { userRank } = useContext(UserRankContext);

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
                    <td className="text-center">{userRank}</td>
                    <td className="text-center">{loggedInUser.points}</td>
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

