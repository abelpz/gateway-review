import { useState } from "react";

import AppNav from "@components/Main/AppNav";

import useAppResources from "@hooks/app/useAppResources";
import { useAuthSession } from "@hooks/useAuthSession";

import { Grid, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import RepoIssues from "@components/RepoIssues";

const Reports = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useAuthSession();
  const [resources] = useAppResources();
  const [current, setCurrent] = useState(0);

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setCurrent(newValue);
  };

  return !user ? null : (
    <>
      <AppNav />
      <Grid container>
        <Grid item xs={12} sm={"auto"} pl={"1rem"}>
          <Tabs
            orientation={isSmall ? "horizontal" : "vertical"}
            variant={isSmall ? "fullWidth" : "scrollable"}
            value={current}
            onChange={handleChange}
            aria-label="workspace selection tabs"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {resources?.map(({ name }, index) => (
              <Tab key={index} label={name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} sm>
          <Paper sx={{ w: "100%", m: "1rem", p: "1rem" }}>
            <RepoIssues resource={resources[current]}></RepoIssues>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Reports;
