import React from 'react';

function UserProfile() {
  const mockHistory = [
    { activity: "Jogging", points: 56, date: "30/1/23", duration: "45 mins" },
    { activity: "Yoga", points: 32, date: "28/1/23", duration: "30 mins" }
  ];

  return (
    <div className="container">
      <h1>User Profile</h1>
      <p>Username: "JohnDoe"</p>
      <p>Rank: 10th</p>
      <p>Points: 155</p>
      <h2>History</h2>
      {mockHistory.map((item, index) => (
        <p key={index}>{item.activity}: {item.points} pts, Date: {item.date}, Duration: {item.duration}</p>
      ))}
    </div>
  );
}

export default UserProfile;
