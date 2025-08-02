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

export default function EditModal({ service, onClose, onSave }) {
  const [form, setForm] = useState({
    name: service.name,
    price: service.price,
    category: service.category,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...service,
      ...form,
      price: parseInt(form.price, 10),
    };
    console.log(payload);
    onSave(payload);
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Edit Service</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Service Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Service Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Hair">Hair</option>
              <option value="Nails">Nails</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Makeup">Makeup</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Service Price</Label>
            <Input
              name="price"
              type="number"
              value={form.price}
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
