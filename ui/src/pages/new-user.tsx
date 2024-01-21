import * as React from "react";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../App.css";

export default function FormPropsTextFields() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // Update state based on the input field
    switch (id) {
      case "first_name":
        setFirstName(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "phone_number":
        setPhoneNumber(value);
        break;
    }
  };

  React.useEffect(() => {
    // Check if all required fields are filled
    const areRequiredFieldsFilled =
      firstName !== "" && lastName !== "" && email !== "" && password !== "";

    // Update the button's disabled state
    setIsButtonDisabled(!areRequiredFieldsFilled);
  }, [firstName, lastName, email, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Prepare data to be sent in the POST request
      const formData = {
        phone_number: phone_number,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      };

      // Make a POST request
      const response = await fetch("http://localhost:8000/user/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Handle the response as needed
        console.log("User created successfully:", responseData);
      } else {
        // Handle non-successful responses
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", (error as Error).message);
    }
  };

  return (
    <div className="App-header">
      <Container
        component="main"
        maxWidth="xs"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 8,
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="first_name"
            label="First Name"
            value={firstName}
            onChange={handleInputChange}
            variant="filled"
          />
          <TextField
            required
            id="last_name"
            label="Last Name"
            value={lastName}
            onChange={handleInputChange}
            variant="filled"
          />
          <TextField
            required
            id="email"
            label="Email"
            value={email}
            onChange={handleInputChange}
            variant="filled"
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
            variant="filled"
          />
          <TextField
            required
            id="phone_number"
            label="Phone Number (Optional)"
            value={phone_number || ""}
            onChange={handleInputChange}
            variant="filled"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            disabled={isButtonDisabled}
          >
            Submit
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
