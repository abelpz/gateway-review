import Login from "@components/LoginForm/Login";
import { useRouter } from "next/router";
import { APP_NAME } from "@common/constants";
import { useSelector } from "react-redux";
import SettingsStepper from "@components/LoginForm/SettingsStepper";

const LoginPage = () => {
  return <SettingsStepper />;
};

export default LoginPage;
