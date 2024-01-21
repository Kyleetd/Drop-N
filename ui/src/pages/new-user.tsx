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
    }
  };

  React.useEffect(() => {
    // Check if all required fields are filled
    const areRequiredFieldsFilled =
      firstName !== "" && lastName !== "" && email !== "" && password !== "";

    // Update the button's disabled state
    setIsButtonDisabled(!areRequiredFieldsFilled);
  }, [firstName, lastName, email, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
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
