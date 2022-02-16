import ReviewNotifications from "@libraries/review/ReviewNotifications";
import React, { createRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { APP_NAME } from "@common/constants";

import ObsReferenceSelector from "@components/WorkSpaces/ObsReferenceSelector";
import ObsWorkspace from "@components/WorkSpaces/ObsWorkspace";

import useAppAuth from "@hooks/app/useAppAuth";
import useAppResources from "@hooks/app/useAppResources";
import useLogout from "@hooks/useLogout";
import useStory from "@hooks/useOBS";
import useReference from "@hooks/useReference";
import useWorkspaces from "@hooks/useWorkspaces";

import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const createReferencesList = (lenght, modifier = (i) => i) =>
  Array.from(Array(lenght), (e, i) => modifier(i).toString());

export default function WorkspaceContainer() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { workspaces, current, setCurrent } = useWorkspaces();
  const { t, i18n } = useTranslation();
  const [resources] = useAppResources();
  const obsRepo = useMemo(
    () => resources.find((resource) => resource.name.split("_")[1] === "obs"),
    [resources]
  );
  console.log({ workspaces });
  const {
    state: { story, frame },
    actions: { setStory, setFrame },
  } = useReference();

  const stories = createReferencesList(50, (i) => i + 1);

  const { items, isLoading, error } = useStory({
    resource: obsRepo,
    story,
  });

  const frames = useMemo(
    () => (!!items?.length && createReferencesList(items?.length)) || ["0"],
    [items?.length]
  );

  const [auth] = useAppAuth();
  const logout = useLogout();

  const onChangeStory = (event, newValue) => {
    console.log({ newStory: newValue });
    setFrame("0");
    setStory(newValue);
  };

  const onChangeFrame = (event, newValue) => {
    console.log({ newFrame: newValue });
    setFrame(newValue);
  };

  const handleOnClick = (e) => {
    logout();
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setCurrent(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{APP_NAME}</Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", justifyContent: "center", p: 5 },
            }}
          >
            <ObsReferenceSelector
              initialStory={story}
              initialFrame={frame}
              stories={stories}
              onChangeStory={onChangeStory}
              frames={frames}
              onChangeFrame={onChangeFrame}
              loadingFrames={!frames}
            />
          </Box>
          <ReviewNotifications authentication={auth}></ReviewNotifications>
          <Button onClick={handleOnClick}>{t("Logout")}</Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} mt="0rem">
        <Grid item xs={12} sm={"auto"} pl={"1rem"}>
          <Tabs
            orientation={isSmall ? "horizontal" : "vertical"}
            variant={isSmall ? "fullWidth" : "scrollable"}
            value={current}
            onChange={handleChange}
            aria-label="workspace selection tabs"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {workspaces?.map(({ name }, index) => (
              <Tab key={index} label={name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} sm>
          <ObsWorkspace
            workspaceId={workspaces[current]?.id}
            obs={obsRepo}
            resources={resources}
            authentication={auth}
            story={story}
            frame={frame}
            frames={items}
            setFrame={setFrame}
            isLoading={isLoading}
          ></ObsWorkspace>
        </Grid>
      </Grid>
    </>
  );
}
