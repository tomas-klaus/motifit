import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { UserRankContext } from "./UserRankContext";

function UserRankProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const [userLoadObject, setUserLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    if (loggedInUser && loggedInUser.id) {
      handleLoad(loggedInUser.id);
    }
  }, [loggedInUser]);

  async function handleLoad(userId) {
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/user/getUserRank?id=${userId}`,
      {
        method: "GET",
      }
    );

    const responseJson = await response.json();
    if (response.status < 400) {
      setUserLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setUserLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  
  //function to display the correct ordinal suffix
  function formatRank(rank) {
    if (!rank) return null; // Handle null
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits > 10 && lastTwoDigits < 14) {
      return rank + "th";
    }
    switch (lastDigit) {
      case 1:
        return rank + "st";
      case 2:
        return rank + "nd";
      case 3:
        return rank + "rd";
      default:
        return rank + "th";
    }
  }

  const value = {
    state: userLoadObject.state,
    userRank: formatRank(userLoadObject.data),
    handlerMap: {},
  };

  return (
    <UserRankContext.Provider value={value}>
      {children}
    </UserRankContext.Provider>
  );
}

export default UserRankProvider;
