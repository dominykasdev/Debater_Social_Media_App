import api from "../../api/connect";

const asyncValidate = async (values /*, dispatch */) => {
    const username = values.username;
    const email = values.email;
    if (username) {
        const checkUsername = await api.get(`/users/available/check/?username=${username}`).catch(error => {
            if (!error.response) {
                throw { username: 'Error: Network Error' }
            } else {
                throw { username: error.response.data.message };
            }
        });
        if (username === checkUsername.data.username) {
            throw { username: 'That username is taken' }
        }
    }

    if (email) {
        const checkEmail = await api.get(`/users/available/check/?email=${email}`).catch(error => {
            if (!error.response) {
                throw { email: 'Error: Network Error' }
            } else {
                throw { email: error.response.data.message };
            }
        });
        if (email === checkEmail.data.email) {
            throw { email: 'That email is not available' }
        }
    }

}

export default asyncValidate;