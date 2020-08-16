import validation from "../Login/validation";

const passwordValidation = ({password, confirmPassword}) => {
    if (password && confirmPassword && password !== confirmPassword) {
        return 'Passwords must be equal'
    }
    return validation.password({password})
}


const confirmPasswordValidation = ({password, confirmPassword}) => {
    if (password && confirmPassword && password !== confirmPassword) {
        return 'Passwords must be equal'
    }
}

export default {
    ...validation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation
}
