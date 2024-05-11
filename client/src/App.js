import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NaviBar from "./NaviBar";
import MainPage from "./MainPage";
import UserProfile from "./UserProfile";
import ActivityList from "./ActivityList";

import UserProvider from "./UserProvider";
import ActivityListProvider from "./ActivityListProvider";
import ActivityRecordListProvider from "./ActivityRecordListProvider";

function App() {
  return (
    <UserProvider>
      <ActivityRecordListProvider>
        <ActivityListProvider>
          <Router>
            <NaviBar />
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route path="/activities" element={<ActivityList />} />

              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </Router>
        </ActivityListProvider>
      </ActivityRecordListProvider>
    </UserProvider>
  );
}

export default App;
