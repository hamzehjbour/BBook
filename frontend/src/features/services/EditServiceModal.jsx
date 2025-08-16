import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUpdateService } from "./useUpdateService";

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

export default function EditModal({
  service,
  setIsEdit,
  setEditItem,
  onClose,
}) {
  const { updateService } = useUpdateService();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    const payload = {
      ...service,
      ...data,
      price: parseInt(data.price, 10),
    };

    updateService(payload, {
      onSuccess: () => {
        setIsEdit(false);
        setEditItem(null);
        queryClient.invalidateQueries(["services"]);
      },
    });
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Edit Service</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Service Name</Label>
            <Input
              id="name"
              defaultValue={service.name}
              {...register("name")}
            />
            {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
          </FormGroup>

          <FormGroup>
            <Label>Service Category</Label>
            <select
              id="category"
              defaultValue={service.category}
              {...register("category", {
                required: "This field is required",
              })}
            >
              <option value="">Select Category</option>
              <option value="Hair">Hair</option>
              <option value="Nails">Nails</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Makeup">Makeup</option>
            </select>
            {errors?.category?.message && (
              <Error>{errors?.category?.message}</Error>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Service Price</Label>
            <Input
              id="price"
              type="number"
              defaultValue={service.price}
              {...register("price", {
                required: "This field is required",
                validate: (val) =>
                  val > 0 || "The price must be greater than 0",
              })}
            />
            {errors?.price?.message && <Error>{errors?.price?.message}</Error>}
          </FormGroup>

          <ButtonRow>
            <button type="reset" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
          </ButtonRow>
        </form>
      </ModalWrapper>
    </Overlay>
  );
}
