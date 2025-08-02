import { useState } from "react";
import styled from "styled-components";
import { useAppointments } from "../features/appointments/useAppointments";
import { useDeleteAppointment } from "../features/appointments/useDeleteAppointment";
import { useUpdateAppointment } from "../features/appointments/useUpdateAppointment";
import ButtonGroup from "../ui/ButtonGroup";
import EditModal from "../features/appointments/EditAppointmentModal";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import StyledParagraph from "../ui/StyledParagraph";
import CreateModal from "../features/appointments/CreateAppointmentModal";
import { useStaffUsers } from "../features/users/useStaffUsers";
import { useServices } from "../features/services/useServices";
import { useCreateAppointment } from "../features/appointments/useCreateAppointment";

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
  const { isPending, data } = useAppointments();
  const { data: staffData } = useStaffUsers();
  const { data: servicesDate } = useServices();
  const { deleteAppointment, isPending: isDeleting } = useDeleteAppointment();
  const { updateAppointment, isPending: isUpdating } = useUpdateAppointment();
  const { createAppointment, isPending: isCreating } = useCreateAppointment();
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isCreate, setIsCreate] = useState(false);

  if (isPending) return <Spinner />;

  const staff = staffData.data.users;
  const services = servicesDate.data.services;

  function handleEdit(id) {
    const item = data.data.find((i) => i.id === id);
    setEditItem(item);
    setIsEdit((editItem) => !editItem);
  }

  function handleSaveEdit(updateItem) {
    setIsEdit(false);
    setEditItem(null);
    updateAppointment(updateItem.id, updateItem);
  }

  function handleSaveCreate(newItem) {
    setIsCreate(false);
    createAppointment(newItem);
  }

  return (
    <StyledDiv>
      <h1>Appointments</h1>
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
        </Row>

        {data.data.map((item) => (
          <Row key={item.id}>
            <StyledParagraph>{item.clientName}</StyledParagraph>
            <StyledParagraph>{formatDate(item.appointmentUTC)}</StyledParagraph>
            <StyledParagraph>{item.service.name}</StyledParagraph>
            <StyledParagraph>{item.staff.name}</StyledParagraph>
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

      <button onClick={() => setIsCreate(true)} disabled={isCreating}>
        Add
      </button>
      {isEdit && (
        <EditModal
          appointment={editItem}
          onClose={() => setIsEdit(false)}
          onSave={handleSaveEdit}
        />
      )}

      {isCreate && (
        <CreateModal
          staff={staff}
          onClose={() => setIsCreate(false)}
          onSave={handleSaveCreate}
          services={services}
        />
      )}
    </StyledDiv>
  );
}

export default Appointments;
