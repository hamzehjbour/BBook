import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [user, setUser] = useLocalStorageState({}, "user");
  const navigate = useNavigate();

  function handleClick() {
    setUser({});
    navigate("/login", { replace: true });
  }

  return (
    <ButtonIcon onClick={handleClick}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
