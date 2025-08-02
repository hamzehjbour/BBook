import styled from "styled-components";
import Spinner from "../ui/Spinner";

import { useUsers } from "../features/users/useUsers";
import Row from "../ui/Row";
import StyledParagraph from "../ui/StyledParagraph";
import ButtonGroup from "../ui/ButtonGroup";
import { useDeleteUser } from "../features/users/useDeleteUser";
import { useState } from "react";
import CreateModal from "../features/users/CreateUserModal";
import { useCreateUser } from "../features/users/useCreateUser";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

function Staff() {
  const { isPending, data } = useUsers();
  const { deleteUser, isPending: isDeleting } = useDeleteUser();
  const { createUser, isPending: isCreating } = useCreateUser();
  const [isCreate, setIsCreate] = useState(false);

  if (isPending) return <Spinner />;

  function handleSaveCreate(newItem) {
    setIsCreate(false);
    createUser(newItem);
  }

  return (
    <StyledDiv>
      <h1>Staff</h1>
      <div>
        <Row>
          <StyledParagraph>
            <strong>Name</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Email</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Role</strong>
          </StyledParagraph>
        </Row>

        {data.data.users.map((item) => (
          <Row key={item.id}>
            <StyledParagraph>{item.name}</StyledParagraph>
            <StyledParagraph>{item.email}</StyledParagraph>
            <StyledParagraph>{item.role}</StyledParagraph>
            <ButtonGroup>
              <button onClick={() => deleteUser(item.id)} disabled={isDeleting}>
                Delete
              </button>
            </ButtonGroup>
          </Row>
        ))}
      </div>

      {isCreate && (
        <CreateModal
          onClose={() => setIsCreate((isCreate) => !isCreate)}
          onSave={handleSaveCreate}
        />
      )}

      <button
        onClick={() => setIsCreate((isCreate) => !isCreate)}
        disabled={isCreating}
      >
        Add
      </button>
    </StyledDiv>
  );
}

export default Staff;
