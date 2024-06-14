import type { RouteObject } from "react-router-dom";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";

export const publicPages:RouteObject[] = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
];
export const appPages:RouteObject[] = [
    {
        path:'*',
        element:<div>not found</div>
    }
]