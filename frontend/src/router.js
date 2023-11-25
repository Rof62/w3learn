import { createBrowserRouter} from "react-router-dom";
import App from "./App"
import { lazy } from "react"
import { userLoader } from "./Loaders/userLoader";
import {ProtectedRoute, ProtectedRouteAdmin} from "./components/protectedRoute/ProtectedRoute";



const Homepage = lazy(() => import("./pages/homepage/Home"));
const Register = lazy(() => import("./pages/register/Inscription"));
const Login = lazy(() => import("./pages/login/Connexion"));
const Blockchain = lazy(() => import("./pages/blockchain/Blockchain"));
const Crypto = lazy(() => import("./pages/crypto/Crypto"));
const Nft = lazy(() => import("./pages/nft/NFT"));
const Metaverse = lazy(() => import("./pages/metaverse/Metaverse"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Description = lazy(() => import("./pages/description/Description"));
const Profile = lazy(() => import("./pages/profile/ProfileGestion"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const ForgotPassword = lazy(() => import("./pages/Security/ForgotPssword"));
const ResetPassword = lazy(() => import("./pages/Security/ResetPassword"));


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: "inscription",
                element: <Register />
            },
            {
                path: "connexion",
                element: <Login />
            },
            {
                path: "blockchain",
                element: <Blockchain />
            },
            {
                path: "crypto",
                element: <Crypto />
            },
            {
                path: "nft",
                element: <Nft />
            },
            {
                path: "metaverse",
                element: <Metaverse />
            },
            {
                path: "blog",
                element: <Blog />
            },
            {
                path: "description/:idProjet",
                element: <Description />
            },
            {
                path: "forgotPassword",
                element: <ForgotPassword />
            },
            {
                path: "resetPassword",
                element: <ResetPassword/>
            },
            {
                path: "profileGestion",
                element:<ProtectedRoute > <Profile /> </ ProtectedRoute>
            },
            {
                path: "admin",
                element: <ProtectedRouteAdmin> <Admin /> </ProtectedRouteAdmin> 
            },

        ]
    }
])