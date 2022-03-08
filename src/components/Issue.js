import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const example = {
  id: 36225,
  url: "https://git.door43.org/api/v1/repos/Es-419_gl/es-419_ta/issues/302",
  html_url: "https://git.door43.org/Es-419_gl/es-419_ta/issues/302",
  number: 302,
  user: {
    id: 40875,
    login: "ZabdielAraujo",
    full_name: "",
    email: "zabdielaraujo@noreply.door43.org",
    avatar_url:
      "https://secure.gravatar.com/avatar/761ddc4741c4e731742d17ce14b444e9?d=identicon",
    language: "",
    is_admin: false,
    last_login: "0001-01-01T00:00:00Z",
    created: "2021-10-29T14:07:26Z",
    repo_languages: null,
    repo_subjects: null,
    restricted: false,
    active: false,
    prohibit_login: false,
    location: "",
    website: "",
    description: "",
    visibility: "public",
    followers_count: 1,
    following_count: 0,
    starred_repos_count: 0,
    username: "ZabdielAraujo",
  },
  original_author: "",
  original_author_id: 0,
  title: 'OBS-review | Cambiar "Tienes" por "tiene"',
  body: '### OBS-review | Cambiar "Tienes" por "tiene"\n\n**Id:**\nrc://*/ta/man/translate/figs-idiom\n**Link:**\nhttps://tcc-idiomaspuentes.netlify.app/pl/Es-419_gl/es-419/ta/translate/figs-idiom/01.md?check=aqu%C3%AD%20tienes%20otras%20opciones:&hint=OBS-review%20%7C%20Cambiar%20%22Tienes%22%20por%20%22tiene%22\n**Quote:**\naquí tienes otras opciones:\n**Occurrence:**\n1\n**Comment:**\n\n',
  ref: "",
  labels: [],
  milestone: null,
  assignee: null,
  assignees: null,
  state: "open",
  is_locked: false,
  comments: 0,
  created_at: "2022-03-04T00:03:16Z",
  updated_at: "2022-03-07T20:10:17Z",
  closed_at: null,
  due_date: null,
  pull_request: null,
  repository: {
    id: 58613,
    name: "es-419_ta",
    owner: "Es-419_gl",
    full_name: "Es-419_gl/es-419_ta",
  },
  metadata: [
    {
      Id: "rc://*/ta/man/translate/figs-idiom",
    },
    {
      Link: "https://tcc-idiomaspuentes.netlify.app/pl/Es-419_gl/es-419/ta/translate/figs-idiom/01.md?check=aqu%C3%AD%20tienes%20otras%20opciones:&hint=OBS-review%20%7C%20Cambiar%20%22Tienes%22%20por%20%22tiene%22",
    },
    {
      Quote: "aquí tienes otras opciones:",
    },
    {
      Occurrence: "1",
    },
    {
      Comment: "",
    },
  ],
};

export default function Issue({ issue }) {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="Open in DCS" href={issue.html_url} target="_blank">
              <LaunchIcon />
            </IconButton>
            <IconButton edge="end" aria-label="Edit in tC Create" href={issue.metadata.Link} target="_blank">
              <EditIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt={issue.user.avatar_url} src={issue.user.avatar_url} />
        </ListItemAvatar>
        <ListItemText
          primary={issue.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {issue.user.login}
              </Typography>
              {' Id: ' + issue.metadata.path || issue.metadata.Id}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
