import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useCreateAppointment } from "./useCreateAppointment";

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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function CreateAppointmentModal({
  staff,
  services,
  onClose,
  setIsCreate,
}) {
  const { register, handleSubmit, reset, formState } = useForm();

  const { createAppointment } = useCreateAppointment();
  const queryClient = useQueryClient();

  const { errors } = formState;

  function onSubmit(data) {
    const newItem = {
      ...data,
      serviceId: parseInt(data.serviceId, 10),
      staffId: parseInt(data.staffId, 10),
      appointmentUTC: new Date(data.appointmentUTC).toISOString(),
      status: "pending",
    };

    createAppointment(newItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["appointments"]);
        reset();
        setIsCreate(false);
      },
    });
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Add Appointment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Client Name</Label>
            <Input
              id="clientName"
              {...register("clientName", {
                required: "This field is required",
              })}
            />
            {errors?.clientName?.message && (
              <Error>{errors.clientName.message}</Error>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Service</Label>
            <select
              id="serviceId"
              {...register("serviceId", {
                required: "This field is required",
              })}
            >
              <option value="">Select a service</option>
              {services.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors?.serviceId?.message && (
              <Error>{errors.serviceId.message}</Error>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Staff</Label>
            <select
              id="staffId"
              {...register("staffId", {
                required: "This field is required",
              })}
            >
              <option value="">Select a staff</option>
              {staff.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors?.staffId?.message && (
              <Error>{errors.staffId.message}</Error>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              id="appointmentUTC"
              type="datetime-local"
              {...register("appointmentUTC", {
                required: "This field is required",
              })}
            />
            {errors?.appointmentUTC?.message && (
              <Error>{errors.appointmentUTC.message}</Error>
            )}
          </FormGroup>
          <ButtonRow>
            <button type="reset" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </ButtonRow>
        </form>
      </ModalWrapper>
    </Overlay>
  );
}
