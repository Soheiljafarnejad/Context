import axios from "axios";
import { createContext, useContext } from "react";
import { useReducerAsync } from "use-reducer-async";

const AuthContext = createContext();
const AuthContextDispatch = createContext();

const initialState = { user: null, loading: false, error: null };

const AuthProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "PENDING":
        return { user: null, loading: true, error: null };
      case "SUCCESS":
        return { user: action.payload, loading: false, error: null };
      case "REJECT":
        return { user: null, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const asyncActionHandlers = {
    USER_INFO:
      ({ dispatch }) =>
      async (action) => {
        dispatch({ type: "PENDING" });
        await axios
          .get("https://jsonplaceholder.typicode.com/users/1")
          .then((res) => {
            dispatch({ type: "SUCCESS", payload: res.data });
          })
          .catch((error) => {
            dispatch({ type: "REJECT", payload: error.message });
          });
      },
  };

  const [value, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);

  return (
    <AuthContext.Provider value={value}>
      <AuthContextDispatch.Provider value={dispatch}>{children}</AuthContextDispatch.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthContextDispatch);
