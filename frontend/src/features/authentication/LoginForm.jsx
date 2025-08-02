import { useState } from "react";

import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import StyledButton from "../../ui/StyledButton";
import StyledInput from "../../ui/StyledInput";
import StyledLabel from "../../ui/StyledLabel";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          id="email"
          type="text"
          autoComplete="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="password">Password</StyledLabel>

        <StyledInput
          id="password"
          autoComplete="current-password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledButton onClick={handleSubmit} disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </StyledButton>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
