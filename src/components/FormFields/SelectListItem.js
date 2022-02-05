import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function SelectListItem({ avatar, text, component, renderButton, ...props }) {
  return (
    <ListItem component={component || "li"} {...props}>
      {renderButton ? (
        <ListItemButton sx={{ width: "100%" }}>
          <ListItemAvatar>
            <Avatar
              alt={avatar.alt}
              src={avatar.src}
              sx={{ background: "#ffffff", p: "0.3rem" }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={text.primary}
            secondary={text.secondary}
            secondaryTypographyProps={{
              noWrap: true,
            }}
          />
        </ListItemButton>
      ) : (
        <>
          <ListItemAvatar>
            <Avatar
              alt={avatar.alt}
              src={avatar.src}
              sx={{ background: "#ffffff", p: "0.3rem" }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={text.primary}
            secondary={text.secondary}
            secondaryTypographyProps={{
              noWrap: true,
            }}
          />
        </>
      )}
    </ListItem>
  );
}

SelectListItem.propTypes = {
  avatar: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }),
  text: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
};

export default SelectListItem;
