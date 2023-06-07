"use client";
import TextField from "@mui/material/TextField";
import useForm from "@/components/helpers/useForm";
import { FlexBlock, StyledLink } from "@/components/styled";
import validation from "@/components/Login/validation";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useCallback, useTransition } from "react";
import { loginAction } from "@/app/login/loginAction";

const defaultForm = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  let [isPending, startTransition] = useTransition();
  console.log(isPending);

  const add = useCallback(async (data: Record<string, any>) => {
    startTransition(() => loginAction(data));
  }, []);

  const [form, errors, handleChange, handleSubmit] = useForm(add, validation, defaultForm);

  return (
    <FlexBlock justifyCenter p={50}>
      <FlexBlock column wAbs={500}>
        <FlexBlock m={[0, 0, 20, 0]} width={100}>
          <TextField
            label="Email"
            error={Boolean(errors.email)}
            onChange={handleChange}
            helperText={errors.email}
            name={"email"}
            value={form.email}
            fullWidth={true}
            variant="outlined"
          />
        </FlexBlock>
        <FlexBlock m={[0, 0, 20, 0]} width={100}>
          <TextField
            label="Password"
            error={Boolean(errors.password)}
            onChange={handleChange}
            helperText={errors.password}
            type={"password"}
            name={"password"}
            value={form.password}
            fullWidth={true}
            variant="outlined"
          />
        </FlexBlock>
        <Button variant={"contained"} color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <StyledLink justifyCenter m={[20, 0]}>
          <span>Do not have an account?</span>
          <Link href="/signup">Sign Up</Link>
        </StyledLink>
      </FlexBlock>
    </FlexBlock>
  );
};
export default LoginComponent;
