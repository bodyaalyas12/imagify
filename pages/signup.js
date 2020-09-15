import TextField from "@material-ui/core/TextField";
import useForm from "../src/components/helpers/useForm";
import {FlexBlock, StyledLink, Title} from "../src/components/styled";
import validation from "../src/components/Signup/validation";
import Button from "@material-ui/core/Button";
import request from "../src/components/helpers/request";
import Link from 'next/link'

const defaultForm = {
    email: '',
    password: '',
    confirmPassword: ''
}

const Login = () => {
    const add = data => {
        return request({
            url: `/api/users/signup`,
            method: "POST",
            body: data
        })
    }
    const [form, errors, handleChange, handleSubmit] = useForm(add, validation, defaultForm)
    return (
        <FlexBlock justifyCenter p={50}>
            <FlexBlock column wAbs={500}>
                <Title>Sign up</Title>
                <FlexBlock m={[0, 0, 20, 0]} width={100}>
                    <TextField
                        label="Email"
                        error={Boolean(errors.email)}
                        onChange={handleChange}
                        helperText={errors.email}
                        name={'email'}
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
                        type={'password'}
                        name={'password'}
                        value={form.password}
                        fullWidth={true}
                        variant="outlined"
                    />
                </FlexBlock>
                <FlexBlock m={[0, 0, 20, 0]} width={100}>
                    <TextField
                        label="Confirm password"
                        error={Boolean(errors.confirmPassword)}
                        onChange={handleChange}
                        helperText={errors.confirmPassword}
                        type={'password'}
                        name={'confirmPassword'}
                        value={form.confirmPassword}
                        fullWidth={true}
                        variant="outlined"
                    />
                </FlexBlock>
                <Button variant={'contained'} color="primary" onClick={handleSubmit}>
                    Sign up
                </Button>
                <StyledLink justifyCenter m={[20, 0]}>
                    <span>Already have an account?</span>
                    <Link href="/login">
                        <a>
                            Sign In
                        </a>
                    </Link>
                </StyledLink>
            </FlexBlock>
        </FlexBlock>
    )
}
export default Login
