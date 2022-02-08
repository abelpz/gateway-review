import theme from "@styles/theme";
import { t } from "i18next";
import PropTypes from "prop-types";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";



import SelectListItem from "@components/FormFields/SelectListItem";
import SettingsForm from "@components/LoginForm/SettingsForm";



import useAppResources from "@hooks/app/useAppResources";
import useRepos from "@hooks/useRepos";



import ClearIcon from "@mui/icons-material/Clear";
import { Divider, FormControl, IconButton, List, ListSubheader, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";


function ResourcesForm() {
  const [resources, addResources, removeResource] = useAppResources();
  const [token, savedOrg] = useSelector(({ settings, ...state }) => [
    settings.auth.sha1,
    settings.org,
  ]);
  const { repos, isLoading, isError } = useRepos(token, savedOrg.username);

  const defaultResources = useMemo(
    () => [
      "obs",
      "obs-tn",
      "obs-tq",
      "obs-twl",
      "ta",
      "tw",
    ],
    []
  );
  useEffect(() => {
    const reposList = repos?.filter((repo) =>
      defaultResources.includes(repo.name.split("_")[1])
    );
    console.log(reposList);
    if (!resources?.length && reposList) addResources(reposList);
  }, [defaultResources, repos, addResources, resources]);

  const handleChange = (e, value, reason) => {
    console.log("Repos to add:", value);
    addResources(value);
  };
  const handleClearResource = (id) => {
    removeResource(resources.find((resource) => resource.id === id));
  };
  return (
    <SettingsForm
      isLoading={isLoading}
      error={isError}
      label={t("Select resources you will be working on")}
      errorMessage={t(
        "Could not find resources in the selected organization. Contact your organization admin."
      )}
    >
      <FormControl fullWidth>
        <Stack spacing={3}>
          <Autocomplete
            multiple
            value={resources?.filter(
              (resource) => resource.owner.id === savedOrg.id
            )}
            id="tags-outlined"
            options={repos || []}
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
                  {...params}
                  label={t("Resources")}
                  placeholder={t("Type your desired resource name here...")}
                />
              );
            }}
          />
        </Stack>
      </FormControl>
      <Paper elevation={6} sx={{ mt: "1rem" }}>
        <List>
          <ListSubheader sx={{ backgroundColor: "inherit" }}>
            {t("Selected resources")}
          </ListSubheader>
          <Divider></Divider>
          {resources.length > 0 &&
            resources.map(
              (resource) =>
                resource.owner.id === savedOrg.id && (
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
                )
            )}
        </List>
      </Paper>
    </SettingsForm>
  );
}

ResourcesForm.propTypes = {
  appName: PropTypes.string,
};

export default ResourcesForm;