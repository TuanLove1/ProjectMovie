import React from 'react'
import Grid from '@mui/material/Grid';
import { Navigate} from 'react-router-dom';

export default function Logout() {
  localStorage.removeItem('user');
  return (
    <Navigate to='/' replace='true'/>
  )
}