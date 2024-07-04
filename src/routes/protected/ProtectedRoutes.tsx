import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";
import PostsPage from "../../pages/posts/PostsPage";
import JobSeekerProfile from "../../pages/jobSeekerProfile/JobSeekerProfile";
import CompanyProfile from "../../pages/companyProfile/CompanyProfile";
import FindCandidates from "../../pages/findCandidates/FindCandidates";
import FindCompanies from "../../pages/findCompanies/FindCompanies";
import JobsPage from "../../pages/jobs/JobsPage";
import ArticlesPage from "../../pages/articles/ArticlesPage";
import CompanyTable from "../../pages/adminPages/CompnayTable";
import JobSeekersTable from "../../pages/adminPages/JobSeekersTable";

export const adminRoutes:RouteObject[] = [
    {
        path: '/manage-job-seekers-accounts',
        element: <JobSeekersTable/>
    },
    {
        path: '/manage-company-accounts',
        element: <CompanyTable/>
    },
    // {
    //     path: '/manage-companies-articles-accounts',
    //     element: <div>hi I admin articles management dashboard</div>
    // },
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
        element: <ArticlesPage/>
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
        element:<JobsPage/>
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
        element: <JobsPage/>
    },
    {
        path: '/manage-articles',
        element: <ArticlesPage/>
    },
    {
        path: '/',
        element: <Home/>
    },
];