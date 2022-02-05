import { UserApi } from "dcs-js";
import useSWR from "swr";

const useRepos = (token, username) => {
  const userClient = new UserApi({
    apiKey: (key) => key === "Authorization" && `token ${token}`,
  });

  const fetchRepos = async () => {
    const reposList = await userClient
      .userListRepos(username)
      .then(({ data }) =>
        //Sort by update date, most recent first.
        data.sort((a, b) => {
          if (a.updated_at < b.updated_at) {
            return 1;
          }
          if (a.updated_at > b.updated_at) {
            return -1;
          }
          return 0;
        })
      );

    return reposList;
  };
  const {
    data: repos,
    error,
    mutate: setRepos,
  } = useSWR(
    !!token && !!username ? ["fetchRepos", username] : null,
    fetchRepos
  );
  return {
    repos,
    setRepos,
    isLoading: !repos && !error && !token && !username,
    isError: error,
  };
};

export default useRepos;
