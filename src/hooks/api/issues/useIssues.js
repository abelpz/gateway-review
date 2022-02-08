import React from "react";
import useSWR from "swr";

import useIssuesApi from "../useIssuesApi";

function useIssues({ resource, token }) {
  const issuesClient = useIssuesApi({ token });
  const { data, error, mutate } = useSWR(
    !!resource && [resource.owner.username, resource.name],
    (owner, repo) =>
      issuesClient.issueListIssues(owner, repo).then(({ data }) => data)
  );

  const setIssue = ({
    title,
    owner,
    repo,
    closed = false,
    body = "",
  }) => {
    const issueBody = {
      title,
      closed,
      body,
    };
    const issue = issuesClient
      .issueCreateIssue(owner, repo, issueBody)
      .then(({ data }) => data);
    //TODO: mutate issues fetched by SWR
    return issue;
  };

  return {
    setIssue,
    issues: data,
    isLoading: !error && !data && !!resource && !!token,
    isError: error,
  };
}

export default useIssues;
