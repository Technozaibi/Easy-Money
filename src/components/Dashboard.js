import React from 'react';

function Dashboard({ user }) {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
      <p>Current Earnings: ${user.earnings.toFixed(2)}</p>
      {/* Add more dashboard features here, e.g., withdrawal button */}
      <h3>Withdraw Earnings (Coming Soon!)</h3>
      <p>Minimum withdrawal amount: $10.00</p>
    </div>
  );
}

export default Dashboard;
