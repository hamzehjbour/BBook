import { useState } from "react";
import styled from "styled-components";
import AppointmentsReportModal from "../features/appointments/AppointmentsReportModal";
import CreateModal from "../features/appointments/CreateAppointmentModal";
import EditModal from "../features/appointments/EditAppointmentModal";
import { useAppointments } from "../features/appointments/useAppointments";
import { useCreateAppointment } from "../features/appointments/useCreateAppointment";
import { useDeleteAppointment } from "../features/appointments/useDeleteAppointment";
import { useDownloadReport } from "../features/appointments/useDownloadReport";
import { useUpdateAppointment } from "../features/appointments/useUpdateAppointment";
import { useServices } from "../features/services/useServices";
import { useStaffUsers } from "../features/users/useStaffUsers";
import ButtonGroup from "../ui/ButtonGroup";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import StyledParagraph from "../ui/StyledParagraph";
import AppointmentsTableOperations from "../features/appointments/AppointmentsTableOperations";
import Pagination from "../ui/Pagination";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Amman",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function Appointments() {
  const { isPending: isLoadingAppointments, data, result } = useAppointments();
  const { isPending: isLoadingStaff, data: staffData } = useStaffUsers();
  const { isPending: isLoadingServices, data: servicesData } = useServices();
  const { deleteAppointment, isPending: isDeleting } = useDeleteAppointment();
  const { isPending: isUpdating } = useUpdateAppointment();
  const { isPending: isCreating } = useCreateAppointment();
  const { downloadReport } = useDownloadReport();
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isDownload, setIsDonwload] = useState(false);

  if (isLoadingAppointments || isLoadingServices || isLoadingStaff)
    return <Spinner />;

  const staff = staffData.data.users;
  const services = servicesData.services;

  function handleEdit(id) {
    const item = data.appointments.find((i) => i.id === id);
    setEditItem(item);
    setIsEdit((editItem) => !editItem);
  }

  function handleDownload(payload) {
    setIsDonwload(false);
    downloadReport(payload.duration);
  }

  return (
    <StyledDiv>
      <h1>Appointments</h1>
      <AppointmentsTableOperations>
        <ButtonGroup>
          <button onClick={() => setIsCreate(true)} disabled={isCreating}>
            Add
          </button>
          <button onClick={() => setIsDonwload(true)}>Download Report</button>
        </ButtonGroup>
      </AppointmentsTableOperations>
      <div>
        <Row>
          <StyledParagraph>
            <strong>Client</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Date</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Service</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Staff</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Status</strong>
          </StyledParagraph>
        </Row>

        {data.appointments.map((item) => (
          <Row key={item.id}>
            <StyledParagraph>{item.clientName}</StyledParagraph>
            <StyledParagraph>{formatDate(item.appointmentUTC)}</StyledParagraph>
            <StyledParagraph>{item.service.name}</StyledParagraph>
            <StyledParagraph>{item.staff.name}</StyledParagraph>
            <StyledParagraph>{item.status}</StyledParagraph>
            <ButtonGroup>
              <button onClick={() => handleEdit(item.id)} disabled={isUpdating}>
                Edit
              </button>
              <button
                onClick={() => deleteAppointment(item.id)}
                disabled={isDeleting}
              >
                Delete
              </button>
            </ButtonGroup>
          </Row>
        ))}
      </div>

      {isEdit && (
        <EditModal
          appointment={editItem}
          onClose={() => setIsEdit(false)}
          setEditItem={setEditItem}
          setIsEdit={setIsEdit}
        />
      )}

      {isDownload && (
        <AppointmentsReportModal
          onClose={() => setIsDonwload(false)}
          onSave={handleDownload}
        />
      )}

      {isCreate && (
        <CreateModal
          staff={staff}
          onClose={() => setIsCreate(false)}
          setIsCreate={setIsCreate}
          services={services}
        />
      )}

      <Pagination count={result} />
    </StyledDiv>
  );
}

export default Appointments;
