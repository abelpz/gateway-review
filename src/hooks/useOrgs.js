import useSWR from "swr";

import useOrgApi from "@hooks/api/useOrgApi";

const useOrgs = (token) => {
  const orgClient = useOrgApi({token});
  
  const fetchOrgs = async () => {
    return await orgClient.orgListCurrentUserOrgs().then(({ data }) => data);
  };
  
  const { data: orgs, error, mutate: setOrgs } = useSWR("fetchOrgs", fetchOrgs);

  return {
    orgs,
    setOrgs,
    isLoading: !error && !orgs && !token,
    error,
  };
};

export default useOrgs;
