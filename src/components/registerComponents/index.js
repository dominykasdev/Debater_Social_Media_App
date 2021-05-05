import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, Form, Message, Progress, Checkbox} from 'semantic-ui-react';

class RegisterForm extends React.Component {

    onSubmit =() => {
        console.log(this.props)
    }

    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div>
                        <Field name="username" type="text" component={renderField} label="Username" placeholder="Create a unique username" />
                    </div>
                    <div>
                        <Field name="email" type="text" component={renderField} label="Email" placeholder="Enter your email that you will use to login" />
                    </div>
                    <div>
                        <Field name="password" type="text" component={renderField} label="Password" placeholder="Create a password" />
                    </div>
                    <Progress color="red" percent={100} />
                    <Button type="submit">Register</Button>
            </form>
        )
    }
}

const renderField = ({
label,
input,
name,
placeholder,
type,
meta: {touched, error, warning}
}) => (
    <Form.Input required inline {...input} value={input.value} name={name} onChange={(param, {value}) => input.onChange(value)} label={label} placeholder={placeholder} /> 
);

export default reduxForm({form: 'register'})(RegisterForm);