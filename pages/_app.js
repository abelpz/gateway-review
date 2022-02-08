import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/utils";

import { CacheProvider } from "@emotion/react";
import i18n from "@locales/i18n";
import "@styles/globals.css";
import theme from "@styles/theme";
import createEmotionCache from "@utils/createEmotionCache";
import { saveState } from "@utils/localStorage";
import { debounce } from "debounce";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import { TOKEN_ID } from "@common/constants";

import Layout from "@components/Layout";

import store from "@store/index";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

ClassNameGenerator.configure((componentName) => `${TOKEN_ID}-${componentName}`);

const clientSideEmotionCache = createEmotionCache();


function MyApp(props) {
  const { locale } = useRouter();
  i18n.changeLanguage(locale).then(() => {
    console.log("locale changed to " + locale);
  });
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(TOKEN_ID, store.getState());
    }, 800)
  );

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
