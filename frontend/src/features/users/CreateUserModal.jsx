import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useCreateUser } from "./useCreateUser";

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

export default function CreateModal({ onClose, setIsCreate }) {
  const { register, handleSubmit, reset, formState, getValues } = useForm();

  const queryClient = useQueryClient();
  const { createUser } = useCreateUser();

  const { errors } = formState;

  function onSubmit(data) {
    const payload = {
      ...data,
    };
    // onSave(payload);

    createUser(payload, {
      onSuccess: () => {
        setIsCreate(false);
        reset();
        queryClient.invalidateQueries(["users"]);
      },
    });
  }

  return (
    <Overlay>
      <ModalWrapper>
        <h3>Create User</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>user Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />

            {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
          </FormGroup>

          <FormGroup>
            <Label>user role</Label>
            <select
              id="role"
              {...register("role", {
                required: "This field is required",
              })}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="receptionist">Receptionist</option>
            </select>
            {errors?.role?.message && <Error>{errors?.role?.message}</Error>}
          </FormGroup>

          <FormGroup>
            <Label>User email</Label>
            <Input
              id="email"
              type="text"
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors?.email?.message && <Error>{errors?.email?.message}</Error>}
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors?.password?.message && (
              <Error>{errors?.password?.message}</Error>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (val) =>
                  getValues().password === val ||
                  "password and confirm password must match",
              })}
            />
            {errors?.confirmPassword?.message && (
              <Error>{errors?.confirmPassword?.message}</Error>
            )}
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
