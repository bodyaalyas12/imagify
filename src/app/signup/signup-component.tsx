"use client";

import TextField from "@mui/material/TextField";
import useForm from "@/components/helpers/useForm";
import validation from "@/components/Signup/validation";
import Button from "@mui/material/Button";
import Link from "next/link";
import { signupAction } from "@/app/signup/signupAction";
import { Grid, Typography } from "@mui/material";

const defaultForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupComponent = () => {
  const add = async (data: Record<string, any>) => {
    const res = await signupAction(data);
    console.log(res);
  };
  const [form, errors, handleChange, handleSubmit] = useForm(add, validation, defaultForm); // TODO rewrite on FORMIK
  return (
    <Grid justifyContent={"center"} container m={8}>
      <Grid direction={"column"} container width={500}>
        <Typography>Sign up</Typography>
        <Grid container mb={2}>
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
        <Grid container mb={2}>
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
        <Grid container mb={2}>
          <TextField
            label="Confirm password"
            error={Boolean(errors.confirmPassword)}
            onChange={handleChange}
            helperText={errors.confirmPassword}
            type={"password"}
            name={"confirmPassword"}
            value={form.confirmPassword}
            fullWidth={true}
            variant="outlined"
          />
        </Grid>
        <Button variant={"contained"} color="primary" onClick={handleSubmit}>
          Sign up
        </Button>
        <Grid container justifyContent={"center"} mt={2}>
          <Typography>Already have an account?</Typography>
          <Link href="/login">
            <Typography>Sign In</Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SignupComponent;
