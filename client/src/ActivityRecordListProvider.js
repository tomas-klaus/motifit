import { useEffect, useState, useContext } from "react";
import { ActivityRecordListContext } from "./ActivityRecordListContext.js";
import { UserContext } from "./UserContext";

function ActivityRecordListProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const [activityRecordLoadObject, setActivityRecordLoadObject] = useState({
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
    setActivityRecordLoadObject((current) => ({
      ...current,
      state: "pending",
    }));
    const response = await fetch(
      `http://localhost:8000/activityRecord/list?id=${userId}`,
      {
        method: "GET",
      }
    );

    const responseJson = await response.json();
    if (response.status < 400) {
      setActivityRecordLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setActivityRecordLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setActivityRecordLoadObject((current) => ({
      ...current,
      state: "pending",
    }));
    console.log("tohle je dtoIn: "+dtoIn);
    const response = await fetch(`http://8000/activityRecord/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    
    const responseJson = await response.json();
    console.log("tohle je dtoIn: " + response);

    if (response.status < 400) {
      setActivityRecordLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setActivityRecordLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: activityRecordLoadObject.state,
    activityRecordList: activityRecordLoadObject.data || [],
    handlerMap: { handleDelete },
  };

  console.log(value);

  return (
    <ActivityRecordListContext.Provider value={value}>
      {children}
    </ActivityRecordListContext.Provider>
  );
}

export default ActivityRecordListProvider;
