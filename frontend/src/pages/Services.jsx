import styled from "styled-components";

import { useState } from "react";
import CreateModal from "../features/services/CreateServiceModal";
import EditModal from "../features/services/EditServiceModal";
import ServicesTableOperations from "../features/services/ServicesTableOperations";
import { useCreateService } from "../features/services/useCreateService";
import { useDeleteService } from "../features/services/useDeleteService";
import { useServices } from "../features/services/useServices";
import { useUpdateService } from "../features/services/useUpdateService";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import ButtonGroup from "../ui/ButtonGroup";
import Row from "../ui/Row";
import StyledParagraph from "../ui/StyledParagraph";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

function Services() {
  const { isPending, data, result } = useServices();
  const [user] = useLocalStorageState({}, "user");
  const { isPending: isEditing } = useUpdateService();
  const { deleteService, isPending: isDeleting } = useDeleteService();
  const { isPending: isCreating } = useCreateService();

  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  if (isPending) return <Spinner />;

  function handleEdit(id) {
    const item = data.services.find((i) => i.id === id);
    setEditItem(item);
    setIsEdit((editItem) => !editItem);
  }

  return (
    <StyledDiv>
      <h1>Services</h1>
      <ServicesTableOperations>
        {user?.user?.role === "admin" ? (
          <button
            onClick={() => setIsCreate((isCreate) => !isCreate)}
            disabled={isCreating}
          >
            Add Service
          </button>
        ) : null}
      </ServicesTableOperations>
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

        {data.services.map((item) => (
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
          setEditItem={setEditItem}
          setIsEdit={setIsEdit}
        />
      )}

      {isCreate && (
        <CreateModal
          onClose={() => setIsCreate((isCreate) => !isCreate)}
          setIsCreate={setIsCreate}
        />
      )}

      <Pagination count={result} />
    </StyledDiv>
  );
}

export default Services;
