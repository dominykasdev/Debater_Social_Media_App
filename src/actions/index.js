import {api, baseURL} from "../api/connect";
import { SIGN_IN, SIGN_OUT, FETCH_USER_DATA, FETCH_POST_DATA, FETCH_POST_FEED, FETCH_COMMENT_FEED, UPDATE_COMMENT, DELETE_COMMENT, REGISTER_USER, LOGIN, LOGOUT } from "./type";
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

export const login = (loginData) => async (dispatch, getState) => {
  const path = "/login";
  const response = await baseURL.post(
    path, loginData
  ).catch((error) => {
    console.log(error);
  });

  dispatch({ type: LOGIN, payload: response.data });
  if (!response.data === "User not found") {
    // setTimeout(() => {
      history.push("/");
    // }, 3000);
  }
}

export const registerUser = (registerData) => async (dispatch, getState) => {
  const path = "/users/register/";

  const response = await api.post(
    path, registerData
  ).catch((error) => {
    console.log(error);
  });

  dispatch({ type: REGISTER_USER, payload: response.data });
  if (!response.error) {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  }
}

export const fetchPostData = (postId) => async (dispatch, getState) => {
  const path = "/posts/";
  const response = await api.get(path + postId);
  dispatch({ type: FETCH_POST_DATA, payload: response.data });
}

export const fetchPostFeed = (user, orderBy = "timestamp", order = 1) => async (dispatch, getState) => {
  let path;
  user ? path = `/posts/?user=${user}&orderBy=${orderBy}&order=${order}` : path = "/posts/";
  console.log(path);
  const response = await api.get(path);
  dispatch({ type: FETCH_POST_FEED, payload: response.data });
}

export const fetchCommentFeed = (postId, orderBy = "timestamp", order = 1) => async (dispatch, getState) => {
  let path;
  postId ? path = `/comments/?postId=${postId}&orderBy=${orderBy}&order=${order}` : path = "/posts/";
  console.log(path);
  const response = await api.get(path).catch(error => {
    if (!error.response) {
      // network error
      this.errorStatus = 'Error: Network Error';
    } else {
      this.errorStatus = error.response.data.message;
    }
  });
  dispatch({ type: FETCH_COMMENT_FEED, payload: response.data });
}

export const updateComment = (commentId, bodyData) => async (dispatch, getState) => {
  const path = `/comments/${commentId}`;
  const response = await api.patch(path, bodyData);
  dispatch({ type: UPDATE_COMMENT, payload: response.data });
}

export const deleteComment = (commentId) => async (dispatch, getState) => {
  const path = `/comments/${commentId}`;
  const response = await api.delete(path);
  dispatch({ type: DELETE_COMMENT, payload: response.data });
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
