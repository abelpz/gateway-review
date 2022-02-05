import { useState } from "react";

import { AddIcon } from "@mui/icons-material";
import { Box, Fade, IconButton, Paper, Popper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ButtonPopper({
  children,
  popperContent,
  OuterAnchorEl,
  isIcon,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(true);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <>
      {isIcon ? (
        <IconButton size="small" onClick={handleClickOpen} {...props}>
          {children}
        </IconButton>
      ) : (
        <Button size="small" onClick={handleClickOpen} {...props}>
          {children}
        </Button>
      )}
      <Popper open={open} anchorEl={OuterAnchorEl ? OuterAnchorEl : anchorEl} placement="right" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>{popperContent}</Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
