import useSWR from "swr";



import useRepoApi from "@hooks/api/useRepoApi";
import useAppAuth from "@hooks/app/useAppAuth";


const useFilesContent = ({ owner, repo, paths, branch = "master" }) => {
  const [auth] = useAppAuth();
  const token = auth.sha1;
  const repoClient = useRepoApi({ token });
  const shouldContinue = Boolean(
    token && owner && repo && !!paths?.length && branch
  );
  const reqId = [token, owner, repo, paths, branch].flat().join("_");

  const fetchFiles = async () => {
    const files = await Promise.all(paths.map(
      async (path) =>
        await repoClient
          .repoGetRawFile(owner, repo, path, branch)
          .then(({ data }) => data)
    ));
    return files;
  };

  const {
    data: files,
    error,
    mutate: setFiles,
  } = useSWR(shouldContinue ? ["fetchFiles", reqId] : null, fetchFiles);

  return {
    files,
    setFiles,
    isLoading: !error && !files && shouldContinue,
    error,
  };
};

export default useFilesContent;