import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";


export const protectedPages:RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
];





