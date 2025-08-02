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

export default function EditModal({ appointment, onClose, onSave }) {
  const [form, setForm] = useState({
    clientName: appointment.clientName,
    appointmentUTC: appointment.appointmentUTC,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...appointment, ...form });
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Edit Appointment</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Client Name</Label>
            <Input
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              name="appointmentUTC"
              value={form.appointmentUTC}
              onChange={handleChange}
              type="datetime-local"
            />
          </FormGroup>
          <ButtonRow>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit " onClick={onSave}>
              Save
            </button>
          </ButtonRow>
        </form>
      </ModalWrapper>
    </Overlay>
  );
}
