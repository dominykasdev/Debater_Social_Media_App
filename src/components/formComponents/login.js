import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form, Message, Progress, Checkbox } from 'semantic-ui-react';


class LoginForm extends React.Component {

    onSubmit = () => {
        console.log(this.props)
    }

    render() {
        return (
            <Container centered textAlign>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="email" type="text" component={renderField} label="Email" placeholder="Enter your email" />
                    <Field name="password" type="text" component={renderField} label="Password" placeholder="" />
                    <Button primary type="submit">Login</Button>
                </Form>
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
    meta: { touched, error, warning }
}) => (
    <Form.Input required fluid inline {...input} value={input.value} name={name} onChange={(param, { value }) => input.onChange(value)} label={label} placeholder={placeholder} />
);

export default reduxForm({ form: 'login' })(LoginForm);