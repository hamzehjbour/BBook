import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getStaff } from "../../services/apiUsers";

export function useStaffUsers() {
  const [user] = useLocalStorageState({}, "user");
  const { isPending, data, error } = useQuery({
    queryKey: ["staff"],
    queryFn: () => getStaff(user.token),
  });

  return { isPending, data, error };
}
