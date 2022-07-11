import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_USER,
  FETCHING_USER,
  UPDATE_USER,
  UPDATE_PASSWORD,
  USER_ERROR,
} from "../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem("ptp-token"),
        user: JSON.parse(localStorage.getItem("ptp-user")),
        isAuthenticated: true,
        role: parseInt(localStorage.getItem("ptp-role")),
        loading: false,
        errFlag: false,
        error: null,
      };
    case FETCH_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        loading: false,
        loadingUser: false,
        errFlag: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      const loginRole = action.payload.user.Roles[0].UserRoles;
      const loginroleId = loginRole.roleId;
      localStorage.setItem("ptp-token", action.payload.token);
      localStorage.setItem("ptp-user", JSON.stringify(action.payload.user));
      localStorage.setItem("ptp-role", parseInt(loginroleId));

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        role: loginroleId,
        loading: true,
        errFlag: false,
        error: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("ptp-token");
      localStorage.removeItem("ptp-user");
      localStorage.removeItem("ptp-role");
      return {
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: action.payload,
        errFlag: true,
      };
    case USER_ERROR:
      return {
        loading: false,
        currentUser: null,
        error: action.payload,
        errFlag: true,
      };
    case LOGOUT:
      localStorage.removeItem("ptp-token");
      localStorage.removeItem("ptp-user");
      localStorage.removeItem("ptp-role");
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case FETCHING_USER:
      return {
        ...state,
        loadingUser: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        errFlag: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
