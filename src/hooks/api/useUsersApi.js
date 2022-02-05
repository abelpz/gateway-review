import { UserApi } from "dcs-js";
import useDcsApi from "./useDcsApi";
/**
 * Uses DCS issues API.
 * @param {Object} basic - Object containing information required for Basic authorization
 * @param {string} basic.username - The username
 * @param {string} basic.password - The user password
 */
const useUsersApi = ({ username, password }) => {
  const usersClient = new UserApi({ username, password });
  return usersClient;
};

export default useUsersApi;
