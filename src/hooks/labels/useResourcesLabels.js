import useSWR from "swr";

import useIssuesApi from "@hooks/api/useIssuesApi";

/**
 * Gets all labels from all given resources
 * @param {Object} args - args Object
 * @param {string} args.token - Token needed to make secure requests.
 * @param {Object[]} args.resources - Array containing resource objects
 */
const useResourcesLabels = ({ token, resources = null }) => {
  const issuesClient = useIssuesApi({ token });
  const fetcher = async (resources) => {
    const labelsList = resources
      ? await Promise.all(
          resources.map((resource) => {
            return issuesClient
              .issueListLabels(resource.owner.username, resource.name)
              .then(({ data }) => {
                if (data?.length === 0) return data;
                const labels = data.map((label) => ({
                  ...label,
                  repo: {
                    id: resource.id,
                    name: resource.name,
                  },
                }));
                return labels;
              });
          })
        )
      : null;
    return labelsList?.flat(1);
  };
  const { data, error, mutate } = useSWR(
    !!resources ? [resources] : null,
    fetcher
  );

  /**
   * Create a label on selected repos
   * @param {Object} params - Object containing function parameters
   * @param {Object[]} [params.target] - Array of resources on which to create labels.
   * @param {Object} params.label - Object containing the label data.
   * @param {string} params.label.name - Name of the label.
   * @param {string} [params.label.description] - Description of the label.
   * @param {string} params.label.color - Color of the label.
   */
  const setLabel = async ({ target = resources, label }) => {
    const newLabels = target
      ? await Promise.all(
          target.map((resource) => {
            return issuesClient
              .issueCreateLabel(resource.owner.username, resource.name, label)
              .then(({ data }) => {
                mutate();
                return data
              });
          })
        )
      : null;
    return newLabels?.flat(1);
  };

  return {
    labels: data,
    setLabel,
    isLoading: !error && !data && !!resources && !!token,
    isError: error,
  };
};
export default useResourcesLabels;
