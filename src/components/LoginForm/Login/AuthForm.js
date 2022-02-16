import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  PASSWORD_RECOVERY_LINK,
  SIGNUP_LINK,
  TOKEN_ID,
} from "@common/constants";

import SettingsForm from "@components/LoginForm/SettingsForm";

import useLogin from "@hooks/useLogin";
import useLogout from "@hooks/useLogout";

import { settingsAdded } from "@store/slices/settings";

import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * @callback handleOnChange
 */

/**
 * Form for user authentication
 * @param {Object} props - The properties for this component.
 * @param {handleOnChange} props.handleOnChange - Callback function to trigger when user has succesfully authenticated.
 */
function AuthForm({ handleOnChange, ...props }) {
  const { t, i18n } = useTranslation();

  const { token: newToken, setToken, isLoading, isError } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) setToken({ username, password });
  };

  const [token, user, options] = useSelector(({ settings }) => [
    settings?.auth,
    settings?.user,
    settings?.options,
  ]);

  useEffect(() => {
    if (!!newToken && handleOnChange) {
      console.log("New token found:", { newToken: newToken.sha1 });
      handleOnChange();
    }
  }, [newToken, handleOnChange]);

  const [disabled, setDisabled] = useState();

  useEffect(() => {
    setDisabled(isLoading || !!token?.sha1);
  }, [isLoading, token?.sha1]);

  const logout = useLogout();

  const handleLogout = () => {
    logout();
    setToken({ username: null, password: null });
    setPassword("");
  };

  const settings = useSelector((state) => state.settings);
  const [keepLoggedIn, setKeepLoggedIn] = useState(options.saveToken);
  const dispatch = useDispatch();

  const handleKeepLoggedIn = (event) => {
    const newSettings = {
      ...settings,
      options: {
        ...settings.options,
        saveToken: event.target.checked,
      },
    };
    setKeepLoggedIn(event.target.checked);
    dispatch(settingsAdded(newSettings));
  };

  // const LoginField = styled(TextField)(({ theme }) => ({
  //   marginTop: 8,
  //   marginBottom: 8
  // }));

  return (
    <>
      <SettingsForm
        isLoading={isLoading}
        error={isError}
        label={t("Login")}
        errorMessage={t("Something went wrong, please try again.")}
      >
        <TextField
          sx={{ my: 1 }}
          required
          disabled={disabled}
          id="name"
          label={t("Username")}
          defaultValue={user?.username}
          fullWidth={true}
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{
            style: {
              borderRadius: "unset",
              WebkitBoxShadow: `0 0 0 100px #232323 inset`,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ my: 1 }}
          required
          disabled={disabled}
          id="password"
          type="password"
          label={t("Password")}
          value={password}
          fullWidth={true}
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{
            style: {
              borderRadius: "unset",
              WebkitBoxShadow: `0 0 0 100px #232323 inset`,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <Link
                target="_blank"
                href={PASSWORD_RECOVERY_LINK}
                variant="caption"
              >
                {t("Forgot password?")}
              </Link>
            ),
          }}
        />

        <FormControlLabel
          label={
            <Typography variant="caption">{t("Keep me logged in")}</Typography>
          }
          control={
            <Checkbox
              //size="small"
              //disabled={disabled && settings.saveToken}
              onChange={handleKeepLoggedIn}
              checked={keepLoggedIn || false}
            />
          }
        />

        <Stack spacing={2} direction="row" sx={{ mt: "1rem" }}>
          <Button
            disabled={disabled}
            color="primary"
            variant="contained"
            onClick={handleLogin}
            sx={{ flex: 1 }}
          >
            {isLoading ? (
              <>
                <CircularProgress size="1rem" sx={{ mr: "0.5rem" }} />{" "}
                {t("Loading...")}
              </>
            ) : (
              t("Login")
            )}
          </Button>
          {token?.sha1 && (
            <Button variant="outlined" onClick={handleLogout} sx={{ flex: 1 }}>
              {t("Logout")}
            </Button>
          )}
        </Stack>
      </SettingsForm>
      <Typography variant="caption">
        {t("Need an account?")}{" "}
        <Link target="_blank" href={SIGNUP_LINK}>
          {t("Register now")}
        </Link>
      </Typography>
    </>
  );
}

AuthForm.propTypes = {
  handleOnChange: PropTypes.func,
};

export default AuthForm;
