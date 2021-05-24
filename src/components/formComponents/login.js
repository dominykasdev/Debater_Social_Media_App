import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Container, Button, Form, Icon, Message } from 'semantic-ui-react';
import { login } from '../../actions';
import { validateLogin as validate } from './validate';


class LoginForm extends React.Component {

    onSubmit = () => {
        this.props.login(this.props.formData);
    }

    render() {
        console.log(this.props.userData);
        return (
            <Container>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="email" type="text" component={renderField} label="Email" placeholder="Enter your email" icon="user" />
                    <Field name="password" type="password" component={renderField} label="Password" placeholder="" />
                    <Button color="orange" type="submit">Login</Button>
                </Form>
                {this.props.userData === "No User Exists" && <Message
                    error
                    header='Cannot login'
                    content="Email not recognised" />}
            </Container>
        )

    }
}

const renderField = ({
    label,
    input,
    name,
    placeholder,
    type,
    meta: { touched, error, warning },
    icon
}) => (
    <Form.Input fluid inline {...input} value={input.value} name={name} type={type} onChange={(param, { value }) => input.onChange(value)} label={label} placeholder={placeholder} error={touched && error && { content: error, pointing: "above" }} iconPosition="left">
        {icon && <Icon color="orange" name={icon} />}
        <input />
    </Form.Input>
);

const mapStateToProps = (state) => {
    return { formData: getFormValues('login')(state), userData: state.user }
}

LoginForm = reduxForm({ form: 'login', validate })(LoginForm);

export default connect(mapStateToProps, { login })(LoginForm);