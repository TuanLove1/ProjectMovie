import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import './grid.css'
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css'
export default function AdminTemplate() {
    if (!localStorage.getItem('user'))
        return <Navigate replace to="/" />
    return (
        <>
            <div className='grid'>
                <div style={{ backgroundImage: `url(https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/movie-details-bg.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height: '100%',minHeight:'700px'}} className='row'>
                    <div className='col l-3 m-3 c-2'>
                        <Navbar />
                    </div>
                    <div  className='col l-9 l-o-3 m-9 m-o-3 c-12'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
