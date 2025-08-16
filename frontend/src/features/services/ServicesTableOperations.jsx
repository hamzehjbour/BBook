import { useForm } from "react-hook-form";
import SortServiceBy from "../../ui/SortServiceBy";
import TableOperations from "../../ui/TableOperations";
import { useSearchParams } from "react-router-dom";
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

function ServicesTableOperations({ children }) {
  const { register, handleSubmit, reset } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    if (!data.category) return;

    searchParams.set("category", data.category);
    setSearchParams(searchParams);
  }

  function onClear() {
    searchParams.delete("category");
    setSearchParams(searchParams);
    reset();
  }

  return (
    <TableOperations>
      <SortServiceBy
        options={[
          { value: "-price", label: "Sort by price (high first)" },
          { value: "price", label: "Sort by price (low first)" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label>Search Category</label>
          <Input id="category" type="text" {...register("category")} />
          <button type="button" onClick={onClear}>
            Clear
          </button>
        </FormGroup>
      </form>
      {children}
    </TableOperations>
  );
}

export default ServicesTableOperations;
