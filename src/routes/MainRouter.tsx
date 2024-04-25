import React from 'react'
import { useRoutes, Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import LayoutContainer from '../Layout/Layout'
import { protectedPages } from './protected/ProtectedRoutes'
import { publicPages, appPages } from './public/PublicRoutes'
import RequireAuth from '../features/auth/RequireAuth'
const MainRouter = () => {
    return (
        <Router>
            <Routes>
                {
                    appPages.map(({ path, element }, index) => (
                        <Route path={path} element={element} key={index} />
                    ))
                }
                <Route element={<RequireAuth isRequired={false} />}>
                    {
                        publicPages.map(({ path, element }, index) => (
                            <Route path={path} element={element} key={index} />
                        ))
                    }
                </Route>
                <Route element={<RequireAuth isRequired={true} />}>
                    <Route element={<LayoutContainer />}>
                        {
                            protectedPages.map(({ path, element }, index) => (
                                <Route path={path} element={element} key={index} />
                            ))
                        }
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default MainRouter