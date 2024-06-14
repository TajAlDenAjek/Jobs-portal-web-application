import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";


export const adminRoutes:RouteObject[] = [
    {
        path: '/',
        element: <div>hi I am admin</div>
    },
];

export const jobSeekerRoutes:RouteObject[] = [
    {
        path: '/secretJobSeeker',
        element: <div>hi I am job seeker</div>
    },
];

export const companyRoutes:RouteObject[] = [
    {
        path: '/',
        element: <div>hi I am company</div>
    },
];




