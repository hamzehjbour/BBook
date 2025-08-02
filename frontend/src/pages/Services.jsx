import styled from "styled-components";
import Spinner from "../ui/Spinner";

import { useServices } from "../features/services/useServices";
import Row from "../ui/Row";
import StyledParagraph from "../ui/StyledParagraph";
import ButtonGroup from "../ui/ButtonGroup";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useState } from "react";
import EditModal from "../features/services/EditServiceModal";
import { useUpdateService } from "../features/services/useUpdateService";
import { useDeleteService } from "../features/services/useDeleteService";
import CreateModal from "../features/services/CreateServiceModal";
import { useCreateService } from "../features/services/useCreateService";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

function Services() {
  const { isPending, data } = useServices();
  const [user] = useLocalStorageState({}, "user");
  const { updateService, isPending: isEditing } = useUpdateService();
  const { deleteService, isPending: isDeleting } = useDeleteService();
  const { createService, isPending: isCreating } = useCreateService();

  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  if (isPending) return <Spinner />;

  function handleEdit(id) {
    const item = data.data.services.find((i) => i.id === id);
    setEditItem(item);
    setIsEdit((editItem) => !editItem);
  }

  function handleSaveEdit(updatedItem) {
    setIsEdit(false);
    setEditItem(null);
    console.log(updatedItem);
    updateService({ id: updatedItem.id, data: updatedItem });
  }

  function handleSaveCreate(newItem) {
    setIsCreate(false);
    createService(newItem);
  }

  return (
    <StyledDiv>
      <h1>Services</h1>
      <div>
        <Row>
          <StyledParagraph>
            <strong>Name</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Price</strong>
          </StyledParagraph>
          <StyledParagraph>
            <strong>Category</strong>
          </StyledParagraph>
        </Row>

        {data.data.services.map((item) => (
          <Row key={item.id}>
            <StyledParagraph>{item.name}</StyledParagraph>
            <StyledParagraph>{item.price}JD</StyledParagraph>
            <StyledParagraph>{item.category}</StyledParagraph>
            {user?.user?.role === "admin" ? (
              <ButtonGroup>
                <button
                  onClick={() => handleEdit(item.id)}
                  disabled={isEditing}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteService(item.id)}
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </ButtonGroup>
            ) : null}
          </Row>
        ))}
      </div>

      {isEdit && (
        <EditModal
          service={editItem}
          onClose={() => setIsEdit(false)}
          onSave={handleSaveEdit}
        />
      )}

      {isCreate && (
        <CreateModal
          onClose={() => setIsCreate((isCreate) => !isCreate)}
          onSave={handleSaveCreate}
        />
      )}

      {user?.user?.role === "admin" ? (
        <button
          onClick={() => setIsCreate((isCreate) => !isCreate)}
          disabled={isCreating}
        >
          Add
        </button>
      ) : null}
    </StyledDiv>
  );
}

export default Services;
