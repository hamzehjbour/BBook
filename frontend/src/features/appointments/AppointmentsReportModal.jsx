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

export default function AppointmentsReportModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    duration: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
    };

    onSave(payload);
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Download Report</h3>
        <form>
          <FormGroup>
            <Label>Duration</Label>
            <select
              required
              name="duration"
              value={form.duration}
              onChange={handleChange}
            >
              <option value="">Choose a Duration</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </FormGroup>

          <ButtonRow>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit}>
              Download
            </button>
          </ButtonRow>
        </form>
      </ModalWrapper>
    </Overlay>
  );
}
