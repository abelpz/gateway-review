import React, { createRef, useMemo, useState } from "react";



import { APP_NAME } from "@common/constants";



import ObsReferenceSelector from "@components/WorkSpaces/ObsReferenceSelector";
import ObsWorkspace from "@components/WorkSpaces/ObsWorkspace";



import useAppAuth from "@hooks/app/useAppAuth";
import useAppResources from "@hooks/app/useAppResources";
import useLogout from "@hooks/useLogout";
import useStory from "@hooks/useOBS";



import { AppBar, Autocomplete, Box, Button, TextField, Toolbar, Typography } from "@mui/material";


const createReferences = (lenght, modifier = (i) => i) =>
  Array.from(Array(lenght), (e, i) => modifier(i).toString());

export default function WorkspaceContainer() {
  const [resources] = useAppResources();
  const obsRepo = useMemo(
    () => resources.find((resource) => resource.name.split("_")[1] === "obs"),
    [resources]
  );

  const [workspace, setWorkspace] = useState({
    story: 1,
    frame: 10,
    tnIndex: 3
  })

  const stories = createReferences(50, (i) => i + 1);
  const [story, setStory] = useState(workspace.story.toString());

  const { items, isLoading, error } = useStory({
    resource: obsRepo,
    story,
  });

  const frames = useMemo(
    () =>
      (!!items?.length && createReferences(items?.length)) || ["0"],
    [items?.length]
  );

  const [frame, setFrame] = useState(workspace.frame.toString());

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
          <Button onClick={handleOnClick}>Logout</Button>
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