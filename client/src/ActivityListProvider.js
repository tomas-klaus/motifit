import { useEffect, useState } from "react";
import { ActivityListContext } from "./ActivityListContext.js";

function ActivityListProvider({ children }) {
  const [activityLoadObject, setActivityLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setActivityLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/activity/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setActivityLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setActivityLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: activityLoadObject.state,
    activityList: activityLoadObject.data || [],
    handlerMap: {},
  };

  return (
    <ActivityListContext.Provider value={value}>
      {children}
    </ActivityListContext.Provider>
  );
}

export default ActivityListProvider;
