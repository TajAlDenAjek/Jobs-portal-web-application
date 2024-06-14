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
        path: '/posts',
        element: <div>Posts</div>
    },
    {
        path: '/articles',
        element: <div>Articles</div>
    },
    {
        path: '/companies',
        element: <div>Companies</div>
    },
    {
        path: '/job-seeker-profile',
        element: <div>Profile</div>
    },
    {
        path: '/jobs',
        element: <div>Jobs</div>
    },
];

export const companyRoutes:RouteObject[] = [
    {
        path: '/',
        element: <div>hi I am company</div>
    },
];




