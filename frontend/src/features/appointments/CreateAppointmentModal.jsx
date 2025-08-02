import { useState } from "react";
import styled from "styled-components";

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

export default function CreateAppointmentModal({
  staff,
  services,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    clientName: "",
    serviceId: "",
    staffId: "",
    appointmentUTC: "",
    status: "pending",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      serviceId: parseInt(form.serviceId, 10),
      staffId: parseInt(form.staffId, 10),
      appointmentUTC: new Date(form.appointmentUTC).toISOString(),
    };

    onSave(payload);
    console.log(payload);
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Add Appointment</h3>
        <form>
          <FormGroup>
            <Label>Client Name</Label>
            <Input
              required
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Service</Label>
            <select
              required
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
            >
              <option value="">Select a service</option>
              {services.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Staff</Label>
            <select
              required
              name="staffId"
              value={form.staffId}
              onChange={handleChange}
            >
              <option value="">Select a staff</option>
              {staff.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              required
              name="appointmentUTC"
              type="datetime-local"
              value={form.appointmentUTC}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonRow>
            <button type="button" onClick={onClose}>
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
