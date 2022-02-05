import React from "react";
import AuthForm from "./AuthForm";
import SettingsLayout from "@components/LoginForm/SettingsLayout";
import { NoSsr } from "@mui/material";

const Login = ({ appName }) => {
  return (
    <NoSsr>
      <SettingsLayout title={appName}>
        <AuthForm></AuthForm>
      </SettingsLayout>
    </NoSsr>
  );
};

export default Login;
