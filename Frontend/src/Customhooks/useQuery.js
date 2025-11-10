import { useQuery } from "@tanstack/react-query";
import FetchApi from "../Utils/Fetch";

export const useCustomQuery = (querykey, url, options = {}) => {
  return useQuery({
    queryKey: [querykey],
    queryFn: () => FetchApi(url),
    retry: false,
    ...options,
  });
};
