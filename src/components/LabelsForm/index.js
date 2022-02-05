import theme from "@styles/theme";
import { t } from "i18next";
import React, { useState } from "react";

import ColorPicker from "@components/FormFields/ColorPicker";
import SelectListItem from "@components/FormFields/SelectListItem";
import SettingsForm from "@components/LoginForm/SettingsForm";

import useAppOrg from "@hooks/app/useAppOrg";
import useAppResources from "@hooks/app/useAppResources";
import useResourcesLabels from "@hooks/labels/useResourcesLabels";

import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Divider,
  FormControl,
  IconButton,
  List,
  ListSubheader,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

function LabelsForm({ token, namespace, ...props }) {
  const [target, setTarget] = useState([]);
  const [resources] = useAppResources();
  const [org] = useAppOrg();
  const { setLabel } = useResourcesLabels(token);
  const handleChange = (e, value, reason) => {
    setTarget(value);
  };
  const handleClearResource = (id) => {
    setTarget(target.filter((resource) => resource.id !== id));
  };
  return (
    <form action="">
      <SettingsForm label="Create label" sx={{ maxHeight: "80vh", overflow: "auto", width: "25rem", maxWidth: "80vw"}}>
        <TextField
          required
          label={t("Label name")}
          placeholder={t("Type your label name here...")}
        ></TextField>
        <TextField
          label={t("Label description")}
          placeholder={t("Type your label description here...")}
        ></TextField>

        <ColorPicker required label={t("Label color")}></ColorPicker>

        <Stack spacing={3}>
          <Autocomplete
            required
            multiple
            value={target}
            id="tags-outlined"
            options={resources || []}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleChange}
            getOptionLabel={(option) =>
              option?.title !== "" ? option.title : option.description
            }
            filterSelectedOptions
            renderOption={(props, option) => {
              return (
                option && (
                  <SelectListItem
                    avatar={{
                      alt: option.name,
                      src: option.avatar_url,
                    }}
                    text={{
                      primary: option.title !== "" ? option.title : option.name,
                      secondary: option.description,
                    }}
                    {...props}
                  />
                )
              );
            }}
            disableClearable
            renderTags={(resources, getTagProps) => null}
            renderInput={(params) => {
              return (
                <TextField
                  required
                  {...params}
                  label={t("Resources")}
                  placeholder={t("Type your desired resource name here...")}
                />
              );
            }}
          />
        </Stack>

        <Paper elevation={6} sx={{ mt: "1rem" }}>
          <List>
            <ListSubheader sx={{ backgroundColor: "inherit" }}>
              {t("Selected resources")}
            </ListSubheader>
            <Divider></Divider>
            {target.length > 0 &&
              target.map((resource) => (
                <SelectListItem
                  renderButton
                  secondaryAction={
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleClearResource(resource.id)}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  }
                  disablePadding
                  key={"selected-resource-" + resource.id}
                  avatar={{
                    alt: resource.name,
                    src: resource.avatar_url,
                  }}
                  text={{
                    primary:
                      resource.title !== "" ? resource.title : resource.name,
                    secondary: resource.description,
                  }}
                  sx={{ background: theme.palette.background }}
                />
              ))}
          </List>
        </Paper>
      </SettingsForm>
    </form>
  );
}

export default LabelsForm;
