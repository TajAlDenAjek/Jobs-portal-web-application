import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";
import PostsPage from "../../pages/posts/PostsPage";
export const adminRoutes:RouteObject[] = [
    {
        path: '/manage-job-seekers-accounts',
        element: <div>hi I admin job seekers management dashboard</div>
    },
    {
        path: '/manage-company-accounts',
        element: <div>hi I admin companies management dashboard</div>
    },
    {
        path: '/manage-companies-articles-accounts',
        element: <div>hi I admin articles management dashboard</div>
    },
    {
        path: '/',
        element: <Home/>
    },
];


export const jobSeekerRoutes:RouteObject[] = [
    {
        path: '/posts',
        element: <PostsPage/>
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
    {
        path: '/',
        element: <Home/>
    },
];


export const companyRoutes:RouteObject[] = [
    {
        path: '/posts',
        element: <PostsPage/>
    },
    {
        path: '/company-profile',
        element: <div>hi I am company profile</div>
    },
    {
        path: '/candidates',
        element: <div>hi I am company candidates</div>
    },
    {
        path: '/manage-jobs',
        element: <div>hi I am company jobs</div>
    },
    {
        path: '/manage-articles',
        element: <div>hi I am company articles</div>
    },
    {
        path: '/',
        element: <Home/>
    },
];