import { useDispatch, useSelector } from "react-redux";

import useLabels from "@hooks/useLabels";

import { resourceRemoved, resourcesUpdated } from "@store/slices/sources";

const useAppResources = () => {
  const dispatch = useDispatch();

  const [token, selectedOrg, resources, allResources] = useSelector(
    ({ settings, sources }) => {
      const token = settings.auth;
      const selectedOrg = settings.org;
      const resources = sources.resources.filter(
        ({ owner }) => owner.id === selectedOrg.id
      );
      const allResources = sources.resources;
      return [token, selectedOrg, resources, allResources];
    }
  );
  const addResources = (resources) => {
    const filteredResources = allResources.filter(
      (resource) => resource.owner.id !== selectedOrg.id
    );
    const newResources = [...filteredResources, ...resources];
    dispatch(resourcesUpdated(newResources));
  };
  const removeResource = (resource) => {
    dispatch(resourceRemoved(resource));
  };
  return [resources, addResources, removeResource];
};

export default useAppResources;
