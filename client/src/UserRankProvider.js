import { useEffect, useState , useContext} from "react";
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
    console.log(loggedInUser);
    if (loggedInUser && loggedInUser.id) {
      handleLoad(loggedInUser.id);
    }
  }, [loggedInUser]);

  async function handleLoad(userId) {
    //console.log("object");
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
      //console.log(responseJson);
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
    userRank: userLoadObject.data || 130,
    handlerMap: {},
  };

  return (
    <UserRankContext.Provider value={value}>
      {children}
    </UserRankContext.Provider>
  );
}

export default UserRankProvider;
