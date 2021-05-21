import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import { Field, reduxForm, getFormValues, getFormSyncErrors, reset, isSubmitting, isPristine } from 'redux-form';
import { Container, Button, Form, Message, Progress, Checkbox, Label, Icon } from 'semantic-ui-react';
import validate from './validate';
import asyncValidate from './asyncValidate';

class RegisterForm extends React.Component {

    onSubmit = () => {
        this.props.registerUser(this.props.formData);
    }

    progressBarCounter(errors = 0) {
        const numOfErrors = Object.keys(errors).length;
        return 4 - numOfErrors;
    }

    render() {
        console.log(this.props);
        return (
            <Container>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui centered text aligned" success={this.props.submitSucceeded}>
                    <Field name="username" type="text" component={renderField} label="Username" placeholder="Create a unique username" width="1" icon="user outline" />
                    <Field name="email" type="email" component={renderField} label="Email" placeholder="Enter your email that you will use to login" icon="at" />
                    <Field name="password" type="password" component={renderField} label="Password" placeholder="" />
                    <Field name="confirmPassword" type="password" component={renderField} label="Confirm your Password" placeholder="" />
                    <Progress
                        active
                        autoSuccess
                        size="small"
                        color="orange"
                        label={this.progressBarCounter(this.props.formErrors) === 4 ? "You're good to go!" : "Registration progress..."}
                        value={this.progressBarCounter(this.props.formErrors)} total='4' />
                    <Message
                        success
                        header='Registration completed'
                        content="You are now able to login! Redirecting..."
                    />
                    <Button color="orange" type="submit" disabled={this.props.pristine || this.props.submitting}>Register</Button>
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
    <Form.Input fluid inline {...input} value={input.value} name={name} type={type} onChange={(param, { value }) => input.onChange(value)} label={label} placeholder={placeholder} error={touched && error && { content: error, pointing: "above" }} iconPosition='left'>
        {/* {<Form.Input required fluid {...input} value={input.value} name={name} type={type} onChange={(param, { value }) => input.onChange(value)} label={label} placeholder={placeholder} iconPosition='left'>} */}
        {icon && <Icon color="orange" name={icon} />}
        <input />
        {/* {touched && error && <Message negative>{error}</Message>} */}
    </Form.Input>
);

const mapStateToProps = (state) => {
    return { formData: getFormValues('register')(state), formErrors: getFormSyncErrors('register')(state) }
}

RegisterForm = reduxForm({ form: 'register', validate, asyncValidate, asyncBlurFields: ['username', 'email'] })(RegisterForm);

export default connect(mapStateToProps, { getFormSyncErrors, registerUser })(RegisterForm);