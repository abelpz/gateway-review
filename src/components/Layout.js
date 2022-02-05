import { useSelector } from "react-redux";
import Login from "./LoginForm/Login";
import SelectOrg from "./LoginForm/Org";
import Head from "next/head";
import { APP_NAME } from "@common/constants";
import { t } from "i18next";
import SettingsStepper from "./LoginForm/SettingsStepper";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="description"
          content="POC of handling DCS issues with react"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ height: "100vh" }}>
        {children}
      </Box>
    </>
  );
}
