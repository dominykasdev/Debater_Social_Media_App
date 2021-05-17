import api from "../../api/connect";

const asyncValidate = async (values /*, dispatch */) => {
    const username = values.username;
    const response = await api.get(`/users/available/${username}`).catch(error => {
        if (!error.response) {
            throw { username: 'Error: Network Error' }
        } else {
            throw { username: error.response.data.message };
        }
    });

    if (username === response.data.username) {
        throw { username: 'That username is taken' }
    }
}

export default asyncValidate;