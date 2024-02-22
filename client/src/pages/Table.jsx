import React, { useEffect, useState } from "react";
import "./Table.css";
import axios from "axios";

const Popup = ({
  task,
  onConfirmMarkAsCompleted,
  onConfirmCancelTask,
  onClose,
  action,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Task Details</h2>
        <p>Customer Name: {task.customerName}</p>
        <p>Category: {task.category}</p>
        <p>Budget: {task.budget} PKR</p>
        <p>Deadline: {task.deadline}</p>
        <div className="popup-buttons">
          {action ? (
            <button onClick={onConfirmMarkAsCompleted}>
              Mark as Completed
            </button>
          ) : (
            <button onClick={onConfirmCancelTask}>Cancel Task</button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const Table = ({ data, setData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [action, setAction] = useState(true);

  useEffect(() => {
    const filter = data.filter((item) => !item.complete);
    setFilteredData(filter);
  }, [data]);

  const markAsCompleted = (id) => {
    const task = data.find((item) => item._id === id);
    setAction(true);
    setSelectedTask(task);
  };

  const cancelTask = (id) => {
    const task = data.find((item) => item._id === id);
    setAction(false);
    setSelectedTask(task);
  };

  const handleConfirmMarkAsCompleted = async () => {
    try {
      const id = selectedTask._id;
      const response = await axios.put(`https://project-management-server-101.vercel.app/api/task/${id}`);

      const updatedData = data.map((item) =>
        item._id === id ? { ...item, complete: true } : item
      );
      setData(updatedData);
      const filter = data.filter((item) => item.complete === false);
      setFilteredData(filter);
      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to mark task as completed:", error);
    }
  };

  const handleConfirmCancelTask = async () => {
    try {
      const id = selectedTask._id;
      const response = await axios.delete(`https://project-management-server-101.vercel.app/api/task/${id}`);

      const updatedData = data.filter((item) => item._id !== selectedTask._id);
      setData(updatedData);
      const filter = data.filter((item) => item.complete === false);
      setFilteredData(filter);
      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to mark task as completed:", error);
    }
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };

  const handleFilterComplete = () => {
    const filteredComplete = data.filter((item) => item.complete);
    setFilteredData(filteredComplete);
  };

  const handleFilterIncomplete = () => {
    const filteredIncomplete = data.filter((item) => !item.complete);
    setFilteredData(filteredIncomplete);
  };

  return (
    <div id="table-container">
      <div className="filter-buttons">
        <button className="filter-btn" onClick={handleFilterComplete}>
          Show Completed
        </button>
        <button className="filter-btn" onClick={handleFilterIncomplete}>
          Show Incomplete
        </button>
      </div>

      <div id="table">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Category</th>
              <th>Budget</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              ({ _id, customerName, category, budget, deadline, complete }) => (
                <tr key={_id}>
                  <td>{customerName}</td>
                  <td>{category}</td>
                  <td>{budget} PKR</td>
                  <td>{deadline}</td>
                  <td className="actions-btns">
                    {!complete && (
                      <>
                        <button
                          className="complete-btn"
                          onClick={() => markAsCompleted(_id)}
                        >
                          Mark as Completed
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => cancelTask(_id)}
                        >
                          Cancel Task
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {selectedTask && (
        <Popup
          task={selectedTask}
          onConfirmMarkAsCompleted={handleConfirmMarkAsCompleted}
          onConfirmCancelTask={handleConfirmCancelTask}
          onClose={handleClosePopup}
          action={action}
        />
      )}
    </div>
  );
};

export default Table;
