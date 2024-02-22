import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Table from "./Table";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("fetch data 1");
    const fetchData = async () => {
      try {
        console.log("fetch data:");
        const response = await axios.get("https://project-management-server-101.vercel.app/api/task");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  },[]);   

  return (
    <div id="dashboard">
      <Sidebar data={data} setData={setData}/>
      <div id="main">
        <Table data={data} setData={setData}/>
      </div>
    </div>
  );
};

export default Dashboard;
