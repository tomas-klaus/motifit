import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NaviBar from "./NaviBar";
import MainPage from "./MainPage";
import UserProfile from "./UserProfile";
import ActivityList from "./ActivityList";

import UserListProvider from "./UserListProvider";
import UserProvider from "./UserProvider";
import UserRankProvider from "./UserRankProvider";
import ActivityListProvider from "./ActivityListProvider";
import ActivityRecordListProvider from "./ActivityRecordListProvider";

//import './App.css';

function App() {
  return (
    <UserProvider>
      <UserRankProvider>
        <ActivityListProvider>
          <Router>
            <NaviBar />
            <Routes>
              <Route
                path="/"
                element={
                  <UserListProvider>
                    <MainPage />
                  </UserListProvider>
                }
              />

              <Route
                path="/profile"
                element={
                  <ActivityRecordListProvider>
                    <UserProfile />
                  </ActivityRecordListProvider>
                }
              />

              <Route path="/activities" element={<ActivityList />} />
            </Routes>
          </Router>
        </ActivityListProvider>
      </UserRankProvider>
    </UserProvider>
  );
}

export default App;
