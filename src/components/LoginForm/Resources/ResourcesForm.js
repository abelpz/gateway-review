import theme from "@styles/theme";
import { t } from "i18next";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";



import { TOKEN_ID } from "@common/constants";



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
  const [errorMessage, setErrorMessage] = useState();

  const defaultResources = useMemo(
    () => ["obs", "obs-tn", "obs-tq", "obs-twl", "ta", "tw"],
    []
  );
  useEffect(() => {
    if (!errorMessage && repos) {
      const reposData = repos?.reduce(
        (prev, curr) => {
          const repoId = curr.name.split("_")[1];
          if (defaultResources.includes(repoId)) {
            return {
              ...prev,
              reposList: [...prev.reposList, curr],
              reposIds: [...prev.reposIds, repoId],
            };
          }
          return { ...prev };
        },

        { reposList: [], reposIds: [] }
      );
      const { reposList, reposIds } = reposData;

      let error = false;
      const setError = (message) => {
        error = true;
        setErrorMessage(message);
      };

      if (!error && !reposIds.includes("obs"))
        setError(
          'No "obs" repo found in your selected org.  Contact your organization admin.'
        );

      if (!error && reposIds.includes("ta") && !reposIds.includes("obs-tn"))
        setError(
          'A "ta" repo is found but none "obs-tn". Contact your organization admin.'
        );

      if (!error && reposIds.includes("tw") && !reposIds.includes("obs-twl"))
        setError(
          'A "tw" repo is found but none "obs-twl". Contact your organization admin.'
        );

      if (!error && !resources?.length && reposList) addResources(reposList);
    }
  }, [
    defaultResources,
    repos,
    addResources,
    resources,
    errorMessage,
    setErrorMessage,
  ]);

  useEffect(() => {
    if (!!resources?.length) {
      const resIds = resources.map((res) => res.name.split("_")[1])
      if (new Set(resIds).size !== resIds.length) {
        setErrorMessage(
          "Currently, obs-review only supports one of each type of resource. Please remove any duplicates, leaving only one of the resource type you want to use."
        );
      } else {
        setErrorMessage(null)
      }
    }
  }, [resources]);

  const handleChange = (e, value, reason) => {
    addResources(value);
  };
  const handleClearResource = (id) => {
    removeResource(resources.find((resource) => resource.id === id));
  };
  return (
    <SettingsForm
      isLoading={isLoading}
      error={!!errorMessage || isError}
      label={t("Select resources you will be working on")}
      errorMessage={
        errorMessage ||
        t(
          "Could not find resources in the selected organization. Contact your organization admin."
        )
      }
    >
      <FormControl fullWidth>
        <Stack spacing={3}>
          <Autocomplete
            sx={{ display: "none" }}
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
                  //placeholder={t("Type your desired resource name here...")}
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
                    secondaryAction={(() => {
                      const repoId = resource.name.split("_")[1];
                      const instances = resources.filter(
                        (res) => repoId === res.name.split("_")[1]
                      );
                      if (instances.length === 1) return <></>;
                      return (
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleClearResource(resource.id)}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      );
                    })()}
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