import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { mainNavbarItems } from './consts/navbarItems';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MovieIcon from '@mui/icons-material/Movie';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import './style.css'
const drawerWidth = 260;
const Navbar = () => {
    const navigate = useNavigate()
    let name = JSON.parse(localStorage.getItem("user")).hoTen
    console.log(name);
    return (
        <div>
            <label for="checkbar" className='menu__barpc'>
                <i class="fas fa-bars"></i>

            </label>
            <div className='menu_pc'>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#101F40',
                            color: 'rgba(255,255,255,0.7)'
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <span style={{ fontSize: '20px', fontWeight: '700' }}><img style={{borderRadius:'50%'}} className='mr-3 ml-2' src='https://pickaface.net/gallery/avatar/unr_fake_190524_1549_9fgji7.png' width={50} height={50} />Hello,{name}</span>
                    <List>
                        {mainNavbarItems.map((item, index) => (
                            <ListItem onClick={() => navigate(item.router)} key={item.id} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
            </div>

            <div className='menu__mobile'>
                <input hidden className='inputCheckBar' type='checkbox' id='checkbar' />
                <label for='checkbar' className='bar_mobile'>
                    <div>
                        <i class="fas fa-times"></i>
                    </div>
                    <div className='mobile__mini'>
                        <ul>
                        <span style={{ fontSize: '15px', fontWeight: '700' }}><img style={{borderRadius:'50%'}} className='mr-3 ml-2' src='https://pickaface.net/gallery/avatar/unr_fake_190524_1549_9fgji7.png' width={50} height={50} />Hello,{name}</span>
                            <NavLink to='user'>
                                <li style={{ display: 'flex', alignItems: 'center',color:'white',margin:'10px 5px',borderBottom:'1px solid #80808075' }}>
                                    <PersonIcon />
                                    <span style={{ fontSize: 20,marginLeft:'10px' }}>User</span>
                                </li>
                            </NavLink>
                           
                            <NavLink to='movie'>
                                <li style={{ display: 'flex', alignItems: 'center',color:'white',margin:'10px 5px',borderBottom:'1px solid #80808075' }}>
                                    <MovieIcon />
                                    <span style={{ fontSize: 20,marginLeft:'10px' }}>Movie</span>
                                </li>
                            </NavLink>
                            <NavLink to='log-out'>
                                <li style={{ display: 'flex', alignItems: 'center',color:'white',margin:'10px 5px',borderBottom:'1px solid #80808075' }}>
                                    <LogoutIcon />
                                    <span style={{ fontSize: 20,marginLeft:'10px' }}>Log out</span>
                                </li>
                            </NavLink>

                        </ul>
                    </div>
                </label>
                <label for='checkbar' className='overlay'></label>
            </div>
        </div>
    )
}
export default Navbar
