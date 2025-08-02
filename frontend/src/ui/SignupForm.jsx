import { useState } from "react";

import Form from "./Form";
import FormRowVertical from "./FormRowVertical";
import RowHorizontal from "./RowHorizontal";
import StyledButton from "./StyledButton";
import StyledIcon from "./StyledIcon";
import StyledInput from "./StyledInput";
import StyledLabel from "./StyledLabel";
import StyledParagraph from "./StyledParagraph";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import SpinnerMini from "./SpinnerMini";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggleShowPassword, setToggleShowPassword] = useState(true);
  const [toggleShowConfirmPassword, setToggleShowConfirmPassword] =
    useState(true);
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

  const handleToggleShowPassword = () => {
    setToggleShowPassword((val) => !val);

    if (toggleShowPassword) {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  const handleToggleShowConfirmPassword = () => {
    setToggleShowConfirmPassword((val) => !val);

    if (toggleShowConfirmPassword) {
      setTypeConfirmPassword("text");
    } else {
      setTypeConfirmPassword("password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);
  };

  return (
    <Form>
      <FormRowVertical>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          id="name"
          autoComplete="username"
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel>Email</StyledLabel>
        <StyledInput
          id="email"
          autoComplete="email"
          placeholder="email@example.com"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel>Password</StyledLabel>
        <RowHorizontal>
          <StyledInput
            id="password"
            autoComplete="new-password"
            placeholder="Password"
            type={typePassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledIcon onClick={handleToggleShowPassword}>
            {toggleShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </StyledIcon>
        </RowHorizontal>
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel>Confirm Password</StyledLabel>
        <RowHorizontal>
          <StyledInput
            id="confirm password"
            autoComplete="new-password"
            placeholder="Confirm Password"
            type={typeConfirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledIcon onClick={handleToggleShowConfirmPassword}>
            {toggleShowConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </StyledIcon>
        </RowHorizontal>
      </FormRowVertical>
      <FormRowVertical>
        <StyledButton onClick={handleLogin}>
          {isLoading ? <SpinnerMini /> : "Sign Up Now"}
        </StyledButton>
      </FormRowVertical>

      <StyledParagraph>Have an account? Login Now</StyledParagraph>
    </Form>
  );
}

export default SignupForm;
