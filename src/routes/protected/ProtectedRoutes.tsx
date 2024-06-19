import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";
import PostsPage from "../../pages/posts/PostsPage";
import JobSeekerProfile from "../../pages/jobSeekerProfile/JobSeekerProfile";
import CompanyProfile from "../../pages/companyProfile/CompanyProfile";
import FindCandidates from "../../pages/findCandidates/FindCandidates";
import FindCompanies from "../../pages/findCompanies/FindCompanies";

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
        element: <FindCompanies/>
    },
    {
        path: '/job-seeker-profile',
        element: <JobSeekerProfile/>
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
        element: <CompanyProfile/>
    },
    {
        path: '/candidates',
        element: <FindCandidates/>
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