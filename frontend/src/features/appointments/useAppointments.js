import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getAppointments } from "../../services/apiAppointments";
import { useSearchParams } from "react-router-dom";

export function useAppointments() {
  const [user] = useLocalStorageState({}, "user");
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORTING
  const sortValue = searchParams.get("sort");
  const sort = !sortValue ? null : { field: "sort", value: sortValue };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data, result } = {},
    error,
  } = useQuery({
    queryKey: ["appointments", filter, sort, page],
    queryFn: () => getAppointments({ token: user.token, filter, sort, page }),
  });

  // Pre fetching
  const pageCount = Math.ceil(result / import.meta.env.VITE_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["appointments", filter, sort, page + 1],
      queryFn: () =>
        getAppointments({ token: user.token, filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["users", filter, sort, page - 1],
      queryFn: () =>
        getAppointments({ token: user.token, filter, sort, page: page - 1 }),
    });

  return { isPending, data, result, error };
}
