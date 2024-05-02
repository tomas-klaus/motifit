import React from 'react';

function ActivityList() {
  const activities = [
    { name: "Jogging", ppm: 8 },
    { name: "Yoga", ppm: 5 },
    { name: "Climbing", ppm: 9 },
    { name: "Gym", ppm: 10 },
    { name: "Soccer", ppm: 10 }
  ];

  return (
    <div className="container">
      <h1>Activity List</h1>
      {activities.map(activity => (
        <div key={activity.name}>
          <p>{activity.name} - PPM: {activity.ppm}</p>
          <input type="number" placeholder="Duration in minutes" />
          <button>Record</button>
        </div>
      ))}
    </div>
  );
}

export default ActivityList;
