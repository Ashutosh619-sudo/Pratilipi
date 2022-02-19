import {Navigate} from "react-router-dom";

export default function RequireAuth({ children }) {

    const user_id = localStorage.getItem("user_id")
  
    return user_id != null ? children : <Navigate to="/signUp"/>;
  }
