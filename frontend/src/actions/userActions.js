export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const rawResponse = await fetch("/users/login", config);
    const data = await rawResponse.json();

    if (data.error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      };

      const rawResponse = await fetch("/users", config);
      const data = await rawResponse.json();

      if (data.error) {
        dispatch({
          type: "USER_REGISTER_FAIL",
          payload: data.error,
        });
      } else {
        dispatch({
          type: "USER_REGISTER_SUCCESS",
          payload: data,
        });

        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const rawResponse = await fetch("/users/" + id, config);
    const data = await rawResponse.json();

    if (data.error) {
      dispatch({
        type: "USER_DETAILS_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "USER_DETAILS_SUCCESS",
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = (email, password) => async (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
  });
  dispatch({
    type: "USER_DETAILS_RESET",
  });
  dispatch({
    type: "ORDER_MY_ORDERS_LIST_RESET",
  });
  dispatch({
    type: "USER_LIST_RESET",
  });
  localStorage.removeItem("userInfo");
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        blends: user.blends,
      }),
    };

    const rawResponse = await fetch("/users/profile", config);
    const data = await rawResponse.json();

    if (data.error) {
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "USER_UPDATE_SUCCESS",
        payload: data,
      });
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });

      dispatch(getUserDetails("profile"));

      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const rawResponse = await fetch("/users/" + id, config);
    const data = await rawResponse.json();

    if (data.error) {
      dispatch({
        type: "USER_DELETE_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "USER_DELETE_SUCCESS",
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: "USER_DELETE_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
