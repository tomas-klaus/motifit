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

  async function handleUpdate(dtoIn) {
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/user/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setUserLoadObject((current) => {
        const userIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[userIndex] = responseJson;
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setUserLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: userLoadObject.state,
    userList: userLoadObject.data || [],
    handlerMap: handleUpdate,
  };

  return (
    <UserListContext.Provider value={value}>
      {children}
    </UserListContext.Provider>
  );
}

export default UserListProvider;
