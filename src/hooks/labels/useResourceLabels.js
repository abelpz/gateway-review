import useIssuesApi from "@hooks/api/useIssuesApi";
import useSWR from "swr";

const useResourceLabels = ({ resource, token }) => {
  const issuesClient = useIssuesApi({ token });
  const { data, error } = useSWR(
    !!resource && [resource.owner.username, resource.name],
    (owner, name) =>
      issuesClient.issueListLabels(owner, name).then(({ data }) => data)
  );
  return {
    labels: data,
    isLoading: !error && !data && !!resource && !!token,
    isError: error,
  };
};

export default useResourceLabels;
