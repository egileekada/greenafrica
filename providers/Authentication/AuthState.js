import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  loginUser,
  registerUser,
  getUser,
  updateUser,
} from "services/authService";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  FETCH_USER,
  FETCHING_USER,
  USER_ERROR,
  UPDATE_USER,
  UPDATE_PASSWORD,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token:
      typeof window !== "undefined" ? localStorage.getItem("ptp-token") : null,
    user:
      typeof window !== "undefined" ? localStorage.getItem("ptp-user") : null,
    isAuthenticated: false,
    role:
      typeof window !== "undefined" ? localStorage.getItem("ptp-role") : null,
    loading: false,
    loadingUser: false,
    currentUser: null,
    error: null,
    errFlag: false,
    testValue: "Olabam",
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const router = useRouter();

  const setUserLoading = () => {
    dispatch({
      type: FETCHING_USER,
    });
  };

  //login user
  const logIn = async (credentials, prevEnabled = false, prevPath = null) => {
    try {
      let res = await loginUser(credentials);
      const userRole = res.data.user.Roles[0].UserRoles;
      const roleId = userRole.roleId;
      const userIsAdmin = parseInt(roleId) === 2 ? true : false;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      if (userIsAdmin) {
        router.push("/employer");
      } else {
        router.push(prevEnabled ? prevPath : "/employee");
      }
    } catch (err) {
      toast.error(
        err.response.data.message || err.response.data.error || "Error occured!"
      );
      dispatch({
        type: LOGIN_FAIL,
        payload:
          err.response.data.message ||
          err.response.data.error ||
          "Error occured!",
      });
    }
  };

  //register user
  const register = async (credentials) => {
    try {
      await registerUser(credentials);
      toast.success("Registration succesful");
      // router.push("/auth/login");
    } catch (err) {
      toast.error(
        err.response.data.message || err.response.data.error || "Error occured!"
      );
      dispatch({
        type: REGISTER_FAIL,
        payload:
          err.response.data.message ||
          err.response.data.error ||
          "Error occured!",
      });
    }
  };

  const getUserProfile = async () => {
    try {
      await setUserLoading();
      let currentUser = await getUser();
      dispatch({
        type: FETCH_USER,
        payload: currentUser,
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Error occured!"
      );
      dispatch({
        type: USER_ERROR,
        payload:
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Error occured!",
      });
    }
  };

  //logout
  const logOut = async () => {
    await dispatch({
      type: LOGOUT,
    });
    // router.push("/auth/login");
  };

  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // Load User
  const loadUser = async () => {
    dispatch({
      type: USER_LOADED,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        currentUser: state.currentUser,
        loadingUser: state.loadingUser,
        error: state.error,
        errFlag: state.errFlag,
        testValue: state.testValue,
        register,
        logIn,
        logOut,
        loadUser,
        clearErrors,
        getUserProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
