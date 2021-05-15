import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions';
import { Field, reduxForm, getFormValues, getFormError } from 'redux-form';
import { Container, Button, Form, Message, Progress, Checkbox, Label, Icon } from 'semantic-ui-react';
import validate from './validate';

class RegisterForm extends React.Component {

    onSubmit = () => {
        console.log(this.props.formData);
        console.log(this.props.formErrors);
    }

    render() {
        console.log(this.props.formErrors);
        return (
            <Container>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui centered text aligned">
                    <Field name="username" type="text" component={renderField} label="Username" placeholder="Create a unique username" width="1" icon="user outline" />
                    <Field name="email" type="email" component={renderField} label="Email" placeholder="Enter your email that you will use to login" icon="at" />
                    <Field name="password" type="password" component={renderField} label="Password" placeholder="" />
                    <Field name="confirmPassword" type="password" component={renderField} label="Confirm your Password" placeholder="" />
                    <Progress active size="small" color="orange" value='3' total='4' progress='ratio' />
                    <Button primary type="submit">Register</Button>
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
    meta: { touched, error, warning },
    icon
}) => (
    <Form.Input required fluid inline {...input} value={input.value} name={name} type={type} onChange={(param, { value }) => input.onChange(value)} label={label} placeholder={placeholder} error={touched && error && { content: error, pointing: "above" }} iconPosition='left'>
        {/* {<Form.Input required fluid {...input} value={input.value} name={name} type={type} onChange={(param, { value }) => input.onChange(value)} label={label} placeholder={placeholder} iconPosition='left'>} */}
        {icon && <Icon color="orange" name={icon} />}
        <input />
        {/* {touched && error && <Message negative>{error}</Message>} */}
    </Form.Input>
);

const mapStateToProps = (state) => {
    return { formData: getFormValues('register')(state), formErrors: getFormError('register')(state) }
}


// export default reduxForm({ form: 'register', validate })(RegisterForm);

RegisterForm = reduxForm({ form: 'register', validate })(RegisterForm);


export default connect(mapStateToProps, { fetchUserData })(RegisterForm);