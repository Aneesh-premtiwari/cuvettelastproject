import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure you have a logo image in this path
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("name", response?.data?.name);
      localStorage.setItem("token", response?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting data:", error);
      navigate("/");
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        width="60%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f4f4f4"
      >
        <img src={logo} alt="logo" style={{ width: "50%", height: "auto" }} />
      </Box>
      <Box
        width="40%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography
          variant="body1"
          sx={{ marginTop: "16px", textAlign: "center" }}
        >
          Don't have an account?
          <Box
            component={Link}
            to="/signup"
            sx={{
              display: "block",
              marginTop: "8px",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
