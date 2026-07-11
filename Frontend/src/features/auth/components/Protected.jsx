import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Protected = ({ children }) => {

    const {
        user, loading
    } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <h1>loading</h1>
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children
}

export default Protected