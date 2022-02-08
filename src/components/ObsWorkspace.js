import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import React, { useState } from "react";
import Workspace from "resource-workspace-rcl/dist/components/Workspace";

import { APP_NAME } from "@common/constants";

import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import ObsCard from "./Cards/ObsCard";
import ObsTaCard from "./Cards/ObsTaCard";
import ObsTnCard from "./Cards/ObsTnCard";
import ObsTqCard from "./Cards/ObsTqCard";
import ObsTwCard from "./Cards/ObsTwCard";
import ObsTwlCard from "./Cards/ObsTwlCard";
import useTwItems from "./Cards/useTwItems";
import useLogout from "@hooks/useLogout";

const workspaceTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.54)",
      disabled: "rgba(0,0,0,0.38)",
      hint: "rgba(0,0,0,0.38)",
    },
  },
});

const stories = Array.from(Array(50), (e, i) => (i + 1).toString());

function ObsWorkspace({ children, resources }) {
  const [story, setStory] = useState(stories[0]);
  const [frame, setFrame] = useState(1);
  const [selectedQuote, setQuote] = useState({});
  const [selectedWord, setWord] = useState({});
  console.log(resources);
  const useStyles = makeStyles(() => ({
    root: {
      padding: 0,
      margin: "0 1px !important",
      height: "100%",
      //overflow: "auto",
      display: "grid",
      gridTemplateRows: "min-content min-content auto",
      color: workspaceTheme.palette.text.primary,
      "& img": {
        width: "100%",
      },
      // '& p': {
      //   aligne
      // }
    },
    dragIndicator: {},
  }));

  const [layout, setLayout] = useState({
    lg: [
      { w: 3, h: 8, x: 0, y: 0, i: "1" },
      { w: 3, h: 8, x: 3, y: 0, i: "2" },
      { w: 3, h: 8, x: 6, y: 0, i: "3" },
      { w: 3, h: 8, x: 9, y: 0, i: "4" },
      { w: 9, h: 3, x: 0, y: 8, i: "5" },
      { w: 3, h: 3, x: 9, y: 8, i: "6" },
    ],
  });

  const onOBSChange = ({ itemIndex }) => {
    setFrame(itemIndex);
  };

  const classes = useStyles();

  const { isLoading, isError, data } = useTwItems({
    twlResource: resources.find(
      (resource) => resource.name.split("_")[1] === "obs-twl"
    ),
    twResource: resources.find(
      (resource) => resource.name.split("_")[1] === "tw"
    ),
    story,
    frame,
  });

  const logout = useLogout();
  const handleOnClick = (e) => {
    logout();
  };

  return (
    <ThemeProvider theme={workspaceTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{APP_NAME}</Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", justifyContent: "center", p: 5 },
            }}
          >
            <Autocomplete
              value={story}
              onChange={(event, newValue) => {
                setFrame(0);
                setStory(newValue);
              }}
              id="controllable-states-demo"
              options={stories}
              sx={{ maxWidth: "5rem" }}
              renderInput={(params) => <TextField {...params} />}
              disableClearable
            />
          </Box>
          <Button onClick={handleOnClick}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Workspace
        autoResize={true}
        rowHeight={25}
        layout={layout}
        classes={classes}
        gridMargin={[10, 10]}
        onLayoutChange={(_layout, layouts) => {
          setLayout(layouts);
        }}
        layoutWidths={[
          [1, 1, 1],
          [2, 2],
          [1, 1.5, 1.5],
        ]}
        layoutHeights={[[5], [10, 10], [10, 10]]}
        minW={6}
        minH={25}
        breakpoints={{
          lg: 900,
          sm: 680,
          xs: 300,
        }}
        columns={{
          lg: 12,
          sm: 6,
          xs: 3,
        }}
      >
        <ObsCard
          story={story}
          frame={frame}
          resource={resources.find(
            (resource) => resource.name.split("_")[1] === "obs"
          )}
          classes={classes}
          onItemChange={onOBSChange}
        />
        <ObsTnCard
          story={story}
          frame={frame}
          setQuote={setQuote}
          selectedQuote={selectedQuote}
          resource={resources.find(
            (resource) => resource.name.split("_")[1] === "obs-tn"
          )}
          classes={classes}
        />
        <ObsTaCard
          story={story}
          frame={frame}
          setQuote={setQuote}
          selectedQuote={selectedQuote}
          resource={resources.find(
            (resource) => resource.name.split("_")[1] === "ta"
          )}
          classes={classes}
        />
        <ObsTwCard
          resource={resources.find(
            (resource) => resource.name.split("_")[1] === "tw"
          )}
          items={data.tw.items}
          title={data.tw.title}
          story={story}
          frame={frame}
          setQuote={setWord}
          selectedQuote={selectedWord}
          classes={classes}
          isLoading={isLoading}
        />
        <ObsTqCard
          story={story}
          frame={frame}
          setQuote={setQuote}
          selectedQuote={selectedQuote}
          resource={resources.find(
            (resource) => resource.name.split("_")[1] === "obs-tq"
          )}
          classes={classes}
        />
        <ObsTwlCard
          items={data.twl.items}
          title={data.twl.title}
          story={story}
          frame={frame}
          setQuote={setWord}
          selectedQuote={selectedWord}
          classes={classes}
          isLoading={isLoading}
        />
      </Workspace>
    </ThemeProvider>
  );
}

export default ObsWorkspace;
