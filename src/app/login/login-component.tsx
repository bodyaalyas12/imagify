"use client";
import TextField from "@mui/material/TextField";
import useForm from "@/components/helpers/useForm";
import validation from "@/components/Login/validation";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { useCallback, useTransition } from "react";
import { loginAction } from "@/app/login/loginAction";
import { Grid, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

const defaultForm = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  let [isPending, startTransition] = useTransition();
  const add = useCallback(async (data: Record<string, any>) => {
    startTransition(() => loginAction(data));
  }, []);

  const [form, errors, handleChange, handleSubmit] = useForm(add, validation, defaultForm); //TODO rewrite to Formik

  return (
    <Grid container justifyContent={"center"} mt={7}>
      <Grid container direction={"column"} width={500}>
        <Grid mb={2} container>
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
        </Grid>
        <Grid mb={2} container>
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
        </Grid>
        <LoadingButton loading={isPending} variant={"contained"} color="primary" onClick={() => signIn()}>
          Submit
        </LoadingButton>
        <Grid container justifyContent={"center"} mt={2}>
          <span>Do not have an account?&nbsp;</span>
          <Link href="/signup">
            <Typography color={"primary"}>Sign Up</Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LoginComponent;
