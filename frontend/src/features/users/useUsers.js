import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getUsers } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";

export function useUsers() {
  const [user] = useLocalStorageState({}, "user");
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const searchValue = searchParams.get("name");
  const search = !searchValue ? null : { field: "name", value: searchValue };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data, result } = {},
    error,
  } = useQuery({
    queryKey: ["users", search, page],
    queryFn: () => getUsers({ token: user.token, search, page }),
  });

  // Pre fetching
  const pageCount = Math.ceil(result / import.meta.env.VITE_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["users", search, page + 1],
      queryFn: () => getUsers({ token: user.token, search, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["users", search, page - 1],
      queryFn: () => getUsers({ token: user.token, search, page: page - 1 }),
    });

  return { isPending, data, result, error };
}
