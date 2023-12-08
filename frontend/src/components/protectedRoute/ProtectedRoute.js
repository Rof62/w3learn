import {useContext} from "react"
import {AuthContext} from "../../context"
import {Navigate} from "react-router-dom"

export  function ProtectedRoute({ children}) {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/connexion"/>
}
export  function ProtectedRouteform({ children}) {
    const {user} = useContext(AuthContext);
    return !user ? children : <Navigate to="/profileGestion"/>
}

export  function ProtectedRouteAdmin ({ children}) {
    const {user} = useContext(AuthContext);
    return user.role === 1 ? children : <Navigate to="/profileGestion"/>
}