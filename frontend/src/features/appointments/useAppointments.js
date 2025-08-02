import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getAppointments } from "../../services/apiAppointments";

export function useAppointments() {
  const [user] = useLocalStorageState({}, "user");

  const { isPending, data, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointments(user.token),
  });

  return { isPending, data, error };
}
