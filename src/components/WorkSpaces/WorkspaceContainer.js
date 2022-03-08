import React, { useMemo } from "react";

import AppNav from "@components/Main/AppNav";
import ObsReferenceSelector from "@components/WorkSpaces/ObsReferenceSelector";
import ObsWorkspace from "@components/WorkSpaces/ObsWorkspace";

import useAppAuth from "@hooks/app/useAppAuth";
import useAppResources from "@hooks/app/useAppResources";
import useStory from "@hooks/useOBS";
import useReference from "@hooks/useReference";
import useWorkspaces from "@hooks/useWorkspaces";

import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const createReferencesList = (lenght, modifier = (i) => i) =>
  Array.from(Array(lenght), (e, i) => modifier(i).toString());

export default function WorkspaceContainer() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { workspaces, current, setCurrent } = useWorkspaces();
  const [resources] = useAppResources();
  const obsRepo = useMemo(
    () => resources.find((resource) => resource.name.split("_")[1] === "obs"),
    [resources]
  );

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

  const onChangeStory = (event, newValue) => {
    console.log({ newStory: newValue });
    setFrame("0");
    setStory(newValue);
  };

  const onChangeFrame = (event, newValue) => {
    console.log({ newFrame: newValue });
    setFrame(newValue);
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
      <AppNav>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", justifyContent: "center"},
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
      </AppNav>

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
