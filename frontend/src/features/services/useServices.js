import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getServices } from "../../services/apiServices";

export function useServices() {
  const [user] = useLocalStorageState({}, "user");
  const { isPending, data, error } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(user.token),
  });

  return { isPending, data, error };
}
