import React, { useContext } from "react";
import { UserListContext } from "./UserListContext";
import { UserContext } from "./UserContext";
import { UserRankContext } from "./UserRankContext";

function MainPage() {
  const { userList } = useContext(UserListContext);
  const { loggedInUser } = useContext(UserContext);
  //const  userRank  = useContext(UserRankContext);
  const {userRank} = useContext(UserRankContext);
  //console.log(userRank)

  return (
    <div className="container">
      <h1>Main Page</h1>
      <div>
        {loggedInUser === null ? (
          <div>Please log in</div>
        ) : (
          <div>
            <p>Rank: {userRank}</p>
            <p>
              Points:
              {loggedInUser.points}
            </p>
          </div>
        )}
      </div>
      <h2>Leaderboard</h2>
      <p>14 days left</p>
      {userList.map((user, index) => (
        <p key={user.username}>
          {index + 1}.{user.username} .......... {user.points}
        </p>
      ))}
    </div>
  );
}

export default MainPage;
