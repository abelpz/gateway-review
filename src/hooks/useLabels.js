import { IssueApi } from "dcs-js";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useAppResources from "./app/useAppResources";

import useResourcesLabels from "./labels/useResourcesLabels";

/**
 * Produces and returns labels based on selected resources.
 * Gets token and resources from global state.
 */
const useLabels = () => {
  const [token] = useSelector(({ settings, sources }) => [
    settings.auth?.sha1,
  ]);
  const [resources] = useAppResources()
  const { labels, isLoading, isError } = useResourcesLabels({
    token,
    resources,
  });

  return { isLoading, isError, labels };
};

export default useLabels;
