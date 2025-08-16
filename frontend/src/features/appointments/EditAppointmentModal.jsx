import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUpdateAppointment } from "./useUpdateAppointment";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function formatDateForInput(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function EditModal({
  appointment,
  onClose,
  setIsEdit,
  setEditItem,
}) {
  const { register, handleSubmit } = useForm();

  const { updateAppointment } = useUpdateAppointment();
  const queryClient = useQueryClient();

  function onSubmit(data) {
    const updatedItem = {
      ...appointment,
      ...data,
      appointmentUTC: new Date(data.appointmentUTC).toISOString(),
    };

    updateAppointment(updatedItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["appointments"]);
        setIsEdit(false);
        setEditItem(null);
      },
    });
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Edit Appointment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Client Name</Label>
            <Input
              id="clientName"
              defaultValue={appointment.clientName}
              {...register("clientName")}
            />
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <select
              id="status"
              defaultValue={appointment.status.toLowerCase()}
              {...register("status", {
                required: "This field is required",
              })}
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </FormGroup>

          <FormGroup>
            <Label>Date</Label>
            <Input
              id="appointmentUTC"
              defaultValue={formatDateForInput(appointment.appointmentUTC)}
              {...register("appointmentUTC")}
              type="datetime-local"
            />
          </FormGroup>
          <ButtonRow>
            <button type="reset" onClick={onClose}>
              Cancel
            </button>
            <button type="submit " onClick={handleSubmit}>
              Save
            </button>
          </ButtonRow>
        </form>
      </ModalWrapper>
    </Overlay>
  );
}
