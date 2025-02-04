import { useContext } from "react"
import { authContext } from "../Providers/AuthProvider"

const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export default useAuth;