import useSWR from "swr";

import useRepoApi from "@hooks/api/useRepoApi";
import useAppAuth from "@hooks/app/useAppAuth";

const useFileContent = ({ owner, repo, path, branch = "master" }) => {
  const [auth] = useAppAuth();
  const token = auth.sha1
  const repoClient = useRepoApi({ token });
  const shouldContinue = Boolean(token && owner && repo && path && branch);
  const reqId = [token, owner, repo, path, branch].join("_");

  const fetchFile = async () => {
    return await repoClient
      .repoGetRawFile(owner, repo, path, branch)
      .then(({ data }) => data);
  };

  const { data: file, error, mutate: setFile } = useSWR(shouldContinue ? ["fetchFile", reqId] : null, fetchFile);

  return {
    file,
    setFile,
    isLoading: !error && !file && !token,
    error,
  };
};

export default useFileContent;
