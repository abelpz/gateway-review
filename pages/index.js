import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import helps from "translation-helps-rcl";

import LabelsForm from "@components/LabelsForm";
import SettingsForm from "@components/LoginForm/SettingsForm";
import Menu from "@components/Main/Menu";

import useAppAuth from "@hooks/app/useAppAuth";
import useAppResources from "@hooks/app/useAppResources";
import { useAuthSession } from "@hooks/useAuthSession";
import useLabels from "@hooks/useLabels";
import useLogout from "@hooks/useLogout";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  GridListTile,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import ObsWorkspace from "@components/ObsWorkspace";

const Home = () => {
  const user = useAuthSession();
  const token = useAppAuth();
  const [resources] = useAppResources();
  const { isError, isLoading, labels } = useLabels();
  const dispatch = useDispatch();
  const logout = useLogout();
  const handleOnClick = (e) => {
    logout();
  };
  const handleOnClickLabels = () => {
    setLabels(resources);
  };
  useEffect(() => {
  }, [labels]);
  const handleCreateSpace = () => {};

  return !user ? null : (
    <Grid container>
      {/* <Grid item xs="auto">
        <Menu></Menu>
      </Grid> */}
      <Grid item xs>
        {/* <Typography variant="h1">{token?.name}</Typography>
        <Button onClick={handleOnClick}>Logout</Button>
        <Button onClick={handleOnClickLabels}>Load labels</Button>
        <Button onClick={handleCreateSpace}>Create space</Button> */}
        <Paper sx={{w:"100%"}}>
          <ObsWorkspace resources={resources}>
          </ObsWorkspace>
          {/* {isLoading ? (
            "loading..."
          ) : (
            <List
              subheader={<ListSubheader disableSticky>Labels</ListSubheader>}
            >
              {labels.map((label, key) => (
                <ListItem key={key}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "#" + label.color }}
                      alt={label.name}
                    >
                      {" "}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={label.name}
                    secondary={label.description}
                  />
                </ListItem>
              ))}
            </List>
          )} */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
