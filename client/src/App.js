import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NaviBar from "./NaviBar";
import MainPage from "./MainPage";
import UserProfile from "./UserProfile";
import ActivityList from "./ActivityList";

import UserListProvider from "./UserListProvider";
import UserProvider from "./UserProvider";
import UserRankProvider from "./UserRankProvider";

//import './App.css';

function App() {
  return (
    <UserProvider>
      <UserRankProvider>
        <Router>
          <NaviBar />
          {/*UserRankProvider*/}
          <Routes>
            <Route
              path="/"
              element={
                <UserListProvider>
                  <MainPage />
                </UserListProvider>
              }
            />
            {/*ActivityRecordListProvider*/}
            <Route path="/profile" element={<UserProfile />} />
            {/*ActivityListProvider*/}
            <Route path="/activities" element={<ActivityList />} />
          </Routes>
        </Router>
      </UserRankProvider>
    </UserProvider>
  );
}

export default App;
