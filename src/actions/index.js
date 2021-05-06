import api from "../api/connect";
import { SIGN_IN, SIGN_OUT, FETCH_USER_DATA, FETCH_POST_DATA, FETCH_POST_FEED} from "./type";
import history from '../history';

export const fetchUserData = (userId) => async (dispatch, getState) => {
  const path = "/users/";
  const response = await api.get(path + userId);
  dispatch({ type: FETCH_USER_DATA, payload: response.data });
}

// export const patchUserData = (formValues, action) => async (dispatch, getState) => {
//   const path = "/projects/api_test/";
//   const { userId } = getState().auth;
//   console.log(formValues);
//   const response = await coinMarketCap.patch(
//     path, { 'id': userId, 'form_values': formValues, 'action': action }
//   );

//   console.log(response);

//   dispatch({ type: PATCH_USER_DATA, payload: response });
//   if (action == 'update_holdings') { history.push("/projects/crypto_app/holdings") };
// }

// export const registerUser = (userId) => async (dispatch, getState) => {
//   const path = "/projects/api_test/";
//   const { userId } = getState().auth;

//   const response = await coinMarketCap.post(
//     path, { 'id': userId, 'action': 'register' }
//   ).then((e) => {
//     console.log(e);
//   }).catch((error) => {
//     console.log(error.response);
//   });
//   console.log(response);

//   dispatch({ type: REGISTER_USER, payload: response });
// }

export const fetchPostData = (postId) => async (dispatch, getState) => {
  const path = "/posts/";
  const response = await api.get(path + postId);
  dispatch({ type: FETCH_POST_DATA, payload: response.data });
}

export const fetchPostFeed = (user, orderBy = "timestamp", order = 1) => async (dispatch, getState) => {
  console.log(order);
  let path;
  user ? path = `/posts/?user=${user}&orderBy=${orderBy}&order=${order}` : path="/posts/";  
  console.log(path);
  const response = await api.get(path);
  dispatch({ type: FETCH_POST_FEED, payload: response.data });
}

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
