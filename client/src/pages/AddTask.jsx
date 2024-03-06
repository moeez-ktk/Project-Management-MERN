import React, { useState } from "react";
import axios from "axios";
import "./AddTask.css";

const AddTask = ({ handleClose, setData, data }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    budget: "",
    category: "",
    deadline: "",
    expertName: "", // New field
    expertBudget: "", // New field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://project-management-server-101.vercel.app/api/task",
        formData
      );
      setData((prevData) => [...prevData, response.data]);
      setFormData({
        customerName: "",
        budget: "",
        category: "",
        deadline: "",
        expertName: "",
        expertBudget: "",
      });
    } catch (error) {
      console.error("Failed to add new task:", error);
    }
  };

  return (
    <div id="add-task-container">
      <div className="add-task">
        <div className="add-form-header">
          <h2>Add Task</h2>
          <div className="close-form-btn" onClick={handleClose}>
            ×
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="budget">Budget:</label>
            <input
              type="number"
              min={0}
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expertName">Expert Name:</label>
            <input
              type="text"
              id="expertName"
              name="expertName"
              value={formData.expertName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expertBudget">Expert Budget:</label>
            <input
              type="number"
              min={0}
              id="expertBudget"
              name="expertBudget"
              value={formData.expertBudget}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
