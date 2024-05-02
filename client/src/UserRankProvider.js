import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { UserRankContext } from "./UserRankContext";

import { useEffect, useState } from "react";

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

  const value = {
    state: userLoadObject.state,
    userRank: userLoadObject.data || 0,
    handlerMap: {},
  };

  return (
    <UserRankContext.Provider value={value}>
      {children}
    </UserRankContext.Provider>
  );
}

export default UserRankProvider;
