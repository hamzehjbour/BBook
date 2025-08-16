import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function AppointmentsTableOperations({ children }) {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" },
          { value: "confirmed", label: "Confirmed" },
          { value: "cancelled", label: "Candelled" },
        ]}
      />

      <SortBy
        options={[
          { value: "-appointmentUTC", label: "Sort by date (recent first)" },
          { value: "appointmentUTC", label: "Sort by date (earlier first)" },
        ]}
      />

      {children}
    </TableOperations>
  );
}

export default AppointmentsTableOperations;
