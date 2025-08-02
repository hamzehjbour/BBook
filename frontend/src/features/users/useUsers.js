import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getUsers } from "../../services/apiUsers";

export function useUsers() {
  const [user] = useLocalStorageState({}, "user");
  const { isPending, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(user.token),
  });

  return { isPending, data, error };
}
