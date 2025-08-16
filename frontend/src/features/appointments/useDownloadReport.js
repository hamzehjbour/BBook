import { useMutation } from "@tanstack/react-query";
import { downloadReport as downloadReportApi } from "../../services/apiAppointments";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useDownloadReport() {
  const [user] = useLocalStorageState({}, "user");

  const { mutate: downloadReport, isPending } = useMutation({
    mutationFn: (duration) => downloadReportApi(user.token, duration),

    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { downloadReport, isPending };
}
