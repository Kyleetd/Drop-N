import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="First Name"
          variant="filled"
        />
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Last Name"
          variant="filled"
        />
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Email"
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Phone Number"
          variant="filled"
        />
      </div>
    </Box>
  );
}
