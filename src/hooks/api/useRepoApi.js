import { RepositoryApi } from "dcs-js";

import useApiConfig from "./useApiConfig";

/**
 * Uses DCS organization API.
 * @param {string} token - Token needed to make secure requests.
 */
const useRepoApi = ({ token }) => {
  const config = useApiConfig({ token });
  const repoClient = new RepositoryApi(config);
  return repoClient;
};

export default useRepoApi;
