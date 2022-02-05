import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import SelectListItem from "@components/FormFields/SelectListItem";
import SettingsForm from "@components/LoginForm/SettingsForm";

import useAppOrg from "@hooks/app/useAppOrg";
import useOrgs from "@hooks/useOrgs";

import {
  Autocomplete,
  Avatar,
  FormControl,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function OrgForm({ handleOnChange }) {
  const { t, i18n } = useTranslation();
  const token = useSelector(({ settings }) => settings?.auth?.sha1);
  const [org, setOrg] = useAppOrg();
  const { isLoading, isError: error, orgs, setOrgs } = useOrgs(token);
  const handleChange = (e) => {
    setOrg(orgs.find((org) => org.id === e.target.value));
    handleOnChange();
  };
  return (
    <SettingsForm
      isLoading={isLoading}
      error={error}
      label={t("Select an organization")}
      errorMessage={t(
        "Could not find the user organizations. Contact your organization admin."
      )}
    >
      <FormControl fullWidth>
        <InputLabel id="select-org-label">{t("Organization")}</InputLabel>
        <Select
          labelId="select-org-label"
          id="demo-simple-select"
          value={
            orgs?.find((fetchedOrg) => fetchedOrg.id === org?.id) ? org.id : ""
          }
          renderValue={(value) => {
            const selectedOrg = org;
            if (!selectedOrg?.id) return undefined;
            return (
              <SelectListItem
                component="div"
                avatar={{
                  alt: selectedOrg.name,
                  src: selectedOrg.avatar_url,
                }}
                text={{
                  primary:
                    selectedOrg.full_name !== ""
                      ? selectedOrg.full_name
                      : selectedOrg.username,
                  secondary: selectedOrg.description,
                }}
              />
            );
          }}
          label={t("Organization")}
          onChange={handleChange}
          sx={{ textOverflow: "ellipsis" }}
        >
          <MenuItem disabled value="">
            <em>{t("Organizations")}</em>
          </MenuItem>
          {orgs?.length > 0
            ? orgs.map((org) => (
                <MenuItem value={org.id} key={org.id}>
                  <SelectListItem
                    component="div"
                    avatar={{
                      alt: org.name,
                      src: org.avatar_url,
                    }}
                    text={{
                      primary:
                        org.full_name !== "" ? org.full_name : org.username,
                      secondary: org.description,
                    }}
                  />
                </MenuItem>
              ))
            : org?.id && (
                <MenuItem value={org.id} key={org.id}>
                  <SelectListItem
                    component="div"
                    avatar={{
                      alt: org.name,
                      src: org.avatar_url,
                    }}
                    text={{
                      primary:
                        org.full_name !== "" ? org.full_name : org.username,
                      secondary: org.description,
                    }}
                  />
                </MenuItem>
              )}
        </Select>
      </FormControl>
    </SettingsForm>
  );
}

OrgForm.propTypes = {
  appName: PropTypes.string,
};

export default OrgForm;
