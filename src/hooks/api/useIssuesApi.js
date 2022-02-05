import { IssueApi } from "dcs-js";

import useApiConfig from "./useApiConfig";

/**
 * Uses DCS issues API.
 * @param {string} token - Token needed to make secure requests.
 */
const useIssuesApi = ({ token }) => {
  const config = useApiConfig({ token });
  const issueClient = new IssueApi(config);
  return issueClient;
};

export default useIssuesApi;
