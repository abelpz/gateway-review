import {
  Badge,
  ClickAwayListener,
  Fade,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useState } from "react";

import useUserIssues from "@hooks/api/issues/useUserIssues";

import { List } from "@mui/material";

export default function ReviewNotifications({
  authentication,
  iconColor = "inherit",
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
  };

  const { issues } = useUserIssues({
    token: authentication.sha1,
    args: { state: "open", assigned: true },
  });

  const handleClickAway = () => {
    setOpen(false);
  };

  const id = open ? "transitions-popper" : undefined;
  return (
    <>
      <IconButton
        aria-label="cart"
        onClick={handleClick}
        style={{ color: iconColor }}
      >
        <Badge badgeContent={issues?.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                {issues.map((value) => {
                  const labelId = `checkbox-list-label-${value.id}`;

                  return (
                    <ListItem key={value.id} role={undefined} dense button>
                      <ListItemText id={labelId} primary={value.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="open"
                          href={value["html_url"]}
                          target="_blank"
                        >
                          <LaunchIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
