import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "", 
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Form Values:", formValues);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
          confirmPassword: formValues.confirmPassword,
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={4}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.password}
        onChange={handleInputChange}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.confirmPassword}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      <Typography
        variant="body1"
        sx={{ marginTop: "16px", textAlign: "center" }}
      >
        Already have an account?
        <Box
          component={Link}
          to="/"
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
          Login
        </Box>
      </Typography>
    </Box>
  );
};

export default Signup;
