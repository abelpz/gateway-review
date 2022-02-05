import { Grid, Typography } from "@mui/material";
import React from "react";

const SettingsLayout = ({ title, description, children, ...props }) => {
  return (
    <Grid
      container
      component="main"
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      my={8}
      {...props}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="caption" mb={5} gutterBottom>
          {description}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default SettingsLayout;
