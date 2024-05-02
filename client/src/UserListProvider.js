import { useEffect, useState } from "react";
import { UserListContext } from "./UserListContext.js";

function UserListProvider({ children }) {
  const [userLoadObject, setUserLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/user/list`, {
      method: "GET",
    });
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
    userList: userLoadObject.data || [],
    handlerMap: {},
  };

  return (
    <UserListContext.Provider value={value}>
      {children}
    </UserListContext.Provider>
  );
}

export default UserListProvider;
