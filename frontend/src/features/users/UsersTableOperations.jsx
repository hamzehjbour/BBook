import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import styled from "styled-components";

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function UsersTableOperations({ children }) {
  const { register, handleSubmit, reset } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    if (!data.user) return;

    searchParams.set("name", data.user);
    setSearchParams(searchParams);
  }

  function onClear() {
    searchParams.delete("name");
    setSearchParams(searchParams);
    reset();
  }

  return (
    <TableOperations>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label>Search Users</label>
          <Input id="user" type="text" {...register("user")} />
          <button type="button" onClick={onClear}>
            Clear
          </button>
        </FormGroup>
      </form>
      {children}
    </TableOperations>
  );
}

export default UsersTableOperations;
