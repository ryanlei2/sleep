import React, { useEffect, useState } from 'react'
import styles from '../styles/dashboard.module.css'

import { useAuth } from '../context/AuthContext'
import { checkAdmin } from '../config/firebase'
import AdminDashboard from "../components/AdminDashboard"
import StudentDashboard from '../components/StudentDashboard'
import { Container } from 'react-bootstrap'
import Link from 'next/link'

const Dashboard = () => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function fetchAdminStatus() {
      const isAdmin = await checkAdmin(user.uid)
      setIsAdmin(isAdmin)
    }

    fetchAdminStatus()
  }, [user.uid])

  return (
    <>
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <StudentDashboard />
      )}
    </>
  )
}

export default Dashboard
