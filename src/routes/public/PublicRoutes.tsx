import type { RouteObject } from "react-router-dom";
import Login from "../../pages/login/Login";


export const publicPages:RouteObject[] = [
    {
        path: '/login',
        element: <Login />
    },
];
export const appPages:RouteObject[] = [
    {
        path:'*',
        element:<div>not found</div>
    }
]