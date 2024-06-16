import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [userListDto, setUserListDto] = useState({
    state: "ready",
    data: null,
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [userLoadObject, setUserLoadObject] = useState({
    state: "ready",
    error: null,
    data: [],
  });

  // useEffect(() => {
  //   setUserListDto((current) => ({ ...current, state: "loading" }));
  //   fetch(`http://localhost:8000/user/list`, {
  //     method: "GET",
  //   }).then(async (response) => {
  //     const responseJson = await response.json();
  //     if (response.status >= 400) {
  //       setUserListDto({ state: "error", error: responseJson.error });
  //     } else {
  //       setUserListDto({ state: "ready", data: responseJson });
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   handleLoad();
  //   console.log("useEffect in UserProvider");
  // }, []);

  async function handleLoad() {
    setUserListDto((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/user/list`, {
      method: "GET",
    });
    console.log("i was called - handleLoad in UserProvider");
    const responseJson = await response.json();
    if (response.status < 400) {
      setUserListDto({ state: "ready", data: responseJson });

      return responseJson;
    } else {
      setUserListDto((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
    
  }

  //console.log(userListDto.data);


  async function handleUpdate(dtoIn) {
    //console.log(dtoIn);
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/user/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    //console.log("this is respomse");
    const responseJson = await response.json();
    console.log(response.status);

    //console.log(responseJson);
  


    if (response.status < 400) {
      setUserLoadObject((current) => {
        current.data = responseJson;
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
    userList: userListDto.data || [],
    loggedInUser: loggedInUser
      ? (userListDto.data || []).find((user) => user.id === loggedInUser)
      : null,
    //userData: userLoadObject.data,
    userHandlerMap: {
      login: setLoggedInUser,
      logout: () => setLoggedInUser(null),
      handleUpdate,
      handleLoad,
    },
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}

export default UserProvider;
