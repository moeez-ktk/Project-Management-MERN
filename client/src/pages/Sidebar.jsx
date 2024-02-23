import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import AddTask from "./AddTask";

const Sidebar = ({ data,setData }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    setCompleted(data.filter((task) => task.complete).length);
    setPending(data.filter((task) => !task.complete).length);
    let temp = 0;
    let date = new Date().getMonth() + 1;
    date = parseInt(date, 10);
    if (date < 10) {
      date = "0" + date;
    }
    data.forEach((task) => {
      // console.log(date, task.deadline.split("-")[1],task.complete);
      if (task.deadline.split("-")[1] == date && task.complete) {
        temp += parseInt(task.budget);
      }
    });
    setMonthlyRevenue(parseInt(temp, 10).toString());
    temp = 0;
    data.forEach((task) => {
      if (task.complete) {
        temp += parseInt(task.budget);
      }
    });
    setTotalRevenue(parseInt(temp, 10).toString());
  });

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <div id="sidebar">
      <h1 className="sidebar-heading">Ahmad Khattak</h1>

      <button className="add-task-btn" onClick={toggleAddTask}>
        Add Task
      </button>

      <div id="statistics">
        <div className="stat">
          <p>Completed</p>
          <p className="stat-number" id="completed-number">
            {completed}
          </p>
        </div>
        <div className="stat">
          <p>Pending</p>
          <p className="stat-number" id="pending-number">
            {pending}
          </p>
        </div>
        <div className="stat">
          <p>Total Revenue</p>
          <p className="stat-number" id="total-revenue-number">
            {totalRevenue}
          </p>
        </div>
        <div className="stat">
          <p>Monthly Revenue</p>
          <p className="stat-number" id="monthly-revenue-number">
            {monthlyRevenue}
          </p>
        </div>
      </div>

      {showAddTask && <AddTask handleClose={toggleAddTask} setData={setData}/>}
    </div>
  );
};

export default Sidebar;
