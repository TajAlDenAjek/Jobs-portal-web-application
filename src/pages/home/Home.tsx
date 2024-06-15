import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminRoutes, companyRoutes, jobSeekerRoutes } from '../../routes/protected/ProtectedRoutes'
import { useSelector } from 'react-redux'
import { selectCurrentPermission } from '../../features/auth/authSlice'
import { Permissions } from '../../features/auth/authSlice'

const Home = () => {
  const navigate = useNavigate()
  const permission: Permissions | null = useSelector(selectCurrentPermission)
  const navigateTo = permission === 'admin' ? adminRoutes[0]?.path : permission === "company" ? companyRoutes[0]?.path : jobSeekerRoutes[0]?.path
  useEffect(() => {
    navigate(String(navigateTo))
  }, [])

  return (
    <div>
      <h1>redirecting...</h1>
    </div>
  )
}

export default Home