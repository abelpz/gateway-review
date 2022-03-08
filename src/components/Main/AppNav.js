import ReviewNotifications from "@libraries/review/ReviewNotifications";
import React from "react";
import { useTranslation } from "react-i18next";

import { APP_NAME } from "@common/constants";

import useAppAuth from "@hooks/app/useAppAuth";
import useLogout from "@hooks/useLogout";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function AppNav({ children }) {
  const { t, i18n } = useTranslation();

  const [auth] = useAppAuth();
  const logout = useLogout();

  const handleOnClick = (e) => {
    logout();
  };

  return (
    <AppBar position="static" sx={{mb:"1rem"}}>
      <Toolbar>
        <Typography variant="h6">{APP_NAME}</Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", p: 5 },
          }}
        >
          {children}
        </Box>

        <ReviewNotifications authentication={auth}></ReviewNotifications>
        <Button onClick={handleOnClick}>{t("Logout")}</Button>
      </Toolbar>
    </AppBar>
  );
}
