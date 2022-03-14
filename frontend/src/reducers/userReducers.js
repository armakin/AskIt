export function userLoginReducer(state = {}, action) {
  if (action.type === "USER_LOGIN_REQUEST") {
    return {
      loading: true,
    };
  } else if (action.type === "USER_LOGIN_SUCCESS") {
    return {
      loading: false,
      userInfo: action.payload,
    };
  } else if (action.type === "USER_LOGIN_FAIL") {
    return {
      loading: false,
      error: action.payload,
    };
  } else if (action.type === "USER_LOGOUT") {
    return {};
  } else return state;
}

export function userRegisterReducer(state = {}, action) {
  if (action.type === "USER_REGISTER_REQUEST") {
    return {
      loading: true,
    };
  } else if (action.type === "USER_REGISTER_SUCCESS") {
    return {
      loading: false,
      userInfo: action.payload,
    };
  } else if (action.type === "USER_REGISTER_FAIL") {
    return {
      loading: false,
      error: action.payload,
    };
  } else return state;
}

export function userDetailsReducer(state = { user: {} }, action) {
  if (action.type === "USER_DETAILS_REQUEST") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "USER_DETAILS_SUCCESS") {
    return {
      loading: false,
      user: action.payload,
    };
  } else if (action.type === "USER_DETAILS_FAIL") {
    return {
      loading: false,
      error: action.payload,
    };
  } else if (action.type === "USER_DETAILS_RESET") {
    return { user: {} };
  } else return state;
}

export function userUpdateProfileReducer(state = {}, action) {
  if (action.type === "USER_UPDATE_REQUEST") {
    return {
      loading: true,
    };
  } else if (action.type === "USER_UPDATE_SUCCESS") {
    return {
      loading: false,
      success: true,
      userInfo: action.payload,
    };
  } else if (action.type === "USER_UPDATE_FAIL") {
    return {
      loading: false,
      error: action.payload,
    };
  } else return state;
}

export function userListReducer(state = { users: [] }, action) {
  if (action.type === "USER_LIST_REQUEST") {
    return { loading: true, users: [] };
  } else if (action.type === "USER_LIST_SUCCESS") {
    return { loading: false, users: action.payload };
  } else if (action.type === "USER_LIST_FAIL") {
    return { loading: false, error: action.payload };
  } else if (action.type === "USER_LIST_RESET") {
    return { users: [] };
  } else return state;
}

export function userDeleteReducer(state = {}, action) {
  if (action.type === "USER_DELETE_REQUEST") {
    return { loading: true };
  } else if (action.type === "USER_DELETE_SUCCESS") {
    return { loading: false, success: true };
  } else if (action.type === "USER_DELETE_FAIL") {
    return { loading: false, error: action.payload };
  } else return state;
}

export function userUpdateByIdReducer(state = { loading: false }, action) {
  if (action.type === "USER_UPDATE_BY_ID_REQUEST") {
    return { loading: true };
  } else if (action.type === "USER_UPDATE_BY_ID_SUCCESS") {
    return { loading: false, success: true };
  } else if (action.type === "USER_UPDATE_BY_ID_FAIL") {
    return { loading: false, error: action.payload };
  } else if (action.type === "USER_UPDATE_BY_ID_RESET") {
    return {};
  } else return state;
}
