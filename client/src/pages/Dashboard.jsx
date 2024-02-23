import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Table from "./Table";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("erp-username");
    const storedPassword = localStorage.getItem("erp-password");
    const usernameFromEnv = import.meta.env.VITE_USERNAME;
    const passwordFromEnv = import.meta.env.VITE_PASSWORD;

    if (
      !storedUsername &&
      !storedPassword &&
      storedUsername !== usernameFromEnv &&
      storedPassword !== passwordFromEnv
    ) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://project-management-server-101.vercel.app/api/task"
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="dashboard">
      <Sidebar data={data} setData={setData} />
      <div id="main">
        <Table data={data} setData={setData} />
      </div>
    </div>
  );
};

export default Dashboard;
