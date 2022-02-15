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

import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const createReferencesList = (lenght, modifier = (i) => i) =>
  Array.from(Array(lenght), (e, i) => modifier(i).toString());

export default function WorkspaceContainer() {
  const { t, i18n } = useTranslation();
  const [resources] = useAppResources();
  const obsRepo = useMemo(
    () => resources.find((resource) => resource.name.split("_")[1] === "obs"),
    [resources]
  );

  const [story, setStory, frame, setFrame] = useReference();

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
          <Button onClick={handleOnClick}>{t("Logout")}</Button>
        </Toolbar>
      </AppBar>
      <ObsWorkspace
        obs={obsRepo}
        resources={resources}
        authentication={auth}
        story={story}
        frame={frame}
        frames={items}
        setFrame={setFrame}
        isLoading={isLoading}
      ></ObsWorkspace>
    </>
  );
}
