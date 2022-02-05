import theme from "@styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

import ButtonDialog from "@components/ButtonPopper";
import ButtonPopper from "@components/ButtonPopper";
import ColorPicker from "@components/FormFields/ColorPicker";
import LabelsForm from "@components/LabelsForm";

import useAppAuth from "@hooks/app/useAppAuth";

import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DnsIcon from "@mui/icons-material/Dns";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import PeopleIcon from "@mui/icons-material/People";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import { Fade, Popper } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material/styles";
import { APP_NAME } from "@common/constants";

const data = [
  {
    icon: <PeopleIcon />,
    label: "Authentication",
  },
  {
    icon: <DnsIcon />,
    label: "Database",
  },
  {
    icon: <PermMediaIcon />,
    label: "Storage",
  },
  {
    icon: <PublicIcon />,
    label: "Hosting",
  },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function Menu({ title }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [auth] = useAppAuth();

  return (
    <Paper
      //elevation={4}
      variant="outlined"
      square
      className="rounded-none h-full"
      sx={{
        maxWidth: "15rem",
        height: "100vh",
      }}
    >
      <FireNav component="nav" disablePadding>
        <Toolbar
          className="bg-indigo-800"
          onClick={() => router.push("/")}
          sx={{
            cursor: "pointer",
          }}
        >
          <IconButton
            edge="start"
            aria-label="icon"
            color="inherit"
            size="large"
          >
            {/* <Image alt="logo" src="/gt-logo.svg" className="h-8" />*/}
            {APP_NAME}
          </IconButton>
          <Typography variant="h6"> {title} </Typography>
        </Toolbar>
        <Divider />
        <ListItem component="div" disablePadding>
          <ListItemButton
            sx={{
              height: 56,
            }}
          >
            <ListItemIcon>
              <HomeIcon htmlColor={theme.palette.primary.light} />
            </ListItemIcon>
            <ListItemText
              primary="Projects Overview"
              primaryTypographyProps={{
                color: theme.palette.primary.light,
                fontWeight: "medium",
                variant: "body2",
              }}
            />
          </ListItemButton>
          <Tooltip title="Project Settings">
            <IconButton
              size="large"
              sx={{
                "& svg": {
                  color: "rgba(255,255,255,0.8)",
                  transition: "0.2s",
                  transform: "translateX(0) rotate(0)",
                },
                "&:hover, &:focus": {
                  bgcolor: "unset",
                  "& svg:first-of-type": {
                    transform: "translateX(-4px) rotate(-20deg)",
                  },
                  "& svg:last-of-type": {
                    right: 0,
                    opacity: 1,
                  },
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  height: "80%",
                  display: "block",
                  left: 0,
                  width: "1px",
                  bgcolor: "divider",
                },
              }}
              onClick={() => router.push("/login")}
            >
              <SettingsIcon />
              <ArrowRightIcon
                sx={{
                  position: "absolute",
                  right: 4,
                  opacity: 0,
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider />
        <Box
          sx={{
            bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
            pb: open ? 2 : 0,
          }}
        >
          <ListItemButton
            alignItems="center"
            sx={{
              width: "100%",
              px: 3,
              pt: 2.5,
              pb: 2.5,
              // "&:hover, &:focus": {
              //   "& svg": {
              //     opacity: open ? 1 : 0,
              //   },
              // },
            }}
            disableRipple
          >
            <ListItemText
              primary="Spaces"
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: "white",
              }}
              secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
              secondaryTypographyProps={{
                noWrap: true,
                textOverflow: "ellipsis",
                fontSize: 12,
                lineHeight: "16px",
                color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                height: open ? 0 : "auto",
                transition: "0.2s",
              }}
              sx={{
                my: 0,
              }}
            />
            <ButtonPopper
              popperContent={<LabelsForm token={auth.sha1}></LabelsForm>}
              aria-label="Add space"
              isIcon
            >
              <AddIcon
                sx={{
                  color: "white",
                  opacity: 1,
                  transition: "0.2s",
                }}
              />
            </ButtonPopper>
            <IconButton
              aria-label="View spaces menu"
              size="small"
              onClick={() => setOpen(!open)}
            >
              <KeyboardArrowDown
                sx={{
                  color: "white",
                  opacity: 1,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </IconButton>
          </ListItemButton>
          {open &&
            data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{
                  display: "flex!important",
                  py: 0,
                  minHeight: 32,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            ))}
        </Box>
      </FireNav>
    </Paper>
  );
}
