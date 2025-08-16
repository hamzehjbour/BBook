import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getServices } from "../../services/apiServices";
import { useSearchParams } from "react-router-dom";

export function useServices() {
  const [user] = useLocalStorageState({}, "user");
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const sortValue = searchParams.get("sortService") || "-price";
  const sortService = !sortValue
    ? null
    : { field: "sortService", value: sortValue };

  const searchValue = searchParams.get("category");
  const search =
    !searchValue || searchValue === ""
      ? null
      : {
          field: "category",
          value: searchValue,
        };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data, result } = {},
    error,
  } = useQuery({
    queryKey: ["services", sortService, search, page],
    queryFn: () =>
      getServices({ token: user.token, sortService, search, page }),
  });

  // Pre fetching
  const pageCount = Math.ceil(result / import.meta.env.VITE_PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["services", sortService, search, page + 1],
      queryFn: () =>
        getServices({ token: user.token, sortService, search, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["services", sortService, search, page - 1],
      queryFn: () =>
        getServices({ token: user.token, sortService, search, page: page - 1 }),
    });
  }

  return { isPending, data, result, error };
}
