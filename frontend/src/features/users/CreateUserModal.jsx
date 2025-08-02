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

export default function CreateModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log({ ...form, [e.target.name]: e.target.value });
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
        <h3>Create User</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>user Name</Label>
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>user role</Label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="receptionist">Receptionist</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label>User email</Label>
            <Input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </FormGroup>

          <ButtonRow>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </ButtonRow>
        </form>
      </ModalWrapper>
    </Overlay>
  );
}
