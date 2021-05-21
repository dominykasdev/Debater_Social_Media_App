const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const validateRegister = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    } else if (!/^[A-Za-z][A-Za-z0-9 -]*$/.test(values.username)) {
        errors.username = 'Username must not begin with number or symbol!'
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email!';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) {
        errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and a number.';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match!';
    }
    return errors;
}

export const validateLogin = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email!';
    }

    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
}