import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
const Analytics = () => {
  const [todo, setTodo] = useState([]);
  const [inpro, setInpro] = useState([]);
  const [done, setDone] = useState([]);
  const [back, setBack] = useState([]);
  const [allData, setAllData] = useState([]);
  const getApiData = async () => {
    try {
      const p = await axios.get("http://localhost:5000/api/", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const dddd = p.data;
      const t = [];
      const ii = [];
      const d = [];
      const b = [];
      setAllData(dddd);
      dddd.forEach((v, i) => {
        if (v.status == "todo") t.push(v);
        if (v.status == "done") d.push(v);
        if (v.status == "inprogress") ii.push(v);
        if (v.status == "backlog") b.push(v);
      });
      setTodo(t);
      setBack(b);
      setDone(d);
      setInpro(ii);
    } catch {
      console.log("got an error");
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>

      <div>
        Backlog tasks :{allData.filter((v, i) => v.status == "backlog").length}
      </div>
      <div>
        To do tasks :{allData.filter((v, i) => v.status == "todo").length}
      </div>
      <div>
        In progress tasks :
        {allData.filter((v, i) => v.status == "inprogress").length}
      </div>
      <div>
        Completed tasks : {allData.filter((v, i) => v.status == "done").length}
      </div>

      <div>
        {" "}
        Low priority :{allData.filter((v, i) => v.priority == "low").length}
      </div>
      <div>
        {" "}
        Moderate priority{" "}
        {allData.filter((v, i) => v.priority == "medium").length}
      </div>
      <div>
        {" "}
        High priority :{allData.filter((v, i) => v.priority == "high").length}
      </div>
      <div>
        {" "}
        Due date tasks :{allData.filter((v, i) => v.status == "todo").length}
      </div>
    </Container>
  );
};

export default Analytics;
