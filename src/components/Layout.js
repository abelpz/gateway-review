import Head from "next/head";
import { APP_NAME } from "@common/constants";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="description"
          content="Review the OBS Book Package"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ height: "100vh" }}>
        {children}
      </Box>
    </>
  );
}
