import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'antd';
import Table from './Table/index';
import Pagination from './Pagination/index';
import './style.css'
import { api } from '../../../api/apiUtil';
import { useNavigate } from 'react-router-dom';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import { actSearchUser } from './SearchUser/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from './TableSearch';
export default function User(props) {
  let navigate = useNavigate()
  const { Search } = Input;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [search, setSearch ] = useState('');
  let dispatch = useDispatch();
  let prop = useSelector((state) => state.searchUserReducer)
  console.log(prop.data);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await api.get('QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP10');
      setUser(res.data.content);
      setLoading(false);
    };

    fetchUsers();
  }, []);
  let searchRef = useRef(null)

  const handleOnChange = (e) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
       setSearch(e.target.value)
      dispatch(actSearchUser(e.target.value))
    }, 300)
  }
  // Get current posts
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='grid wide'>
      <div className='row'>
        <div className='col l-12'>
          <CustomCard className="form_mobile"

            effectColor='rgba(54, 215, 183, 1)' // required
            color="#14AEFF" // default color is white
            blur={5} // default blur value is 10px
            borderRadius={0} // default border radius value is 10px
          >
            <h1 style={{ textAlign: 'center', color: 'white' }}>Quản lý người dùng</h1>
            <Button onClick={() => {
              navigate('/admin/add-user')
            }} className='mb-2' variant="contained">Thêm người dùng</Button>
            <Search onChange={handleOnChange} className='mb-2' placeholder="Tìm kiếm" enterButton />
            <div style={{overflowX:'auto'}}>
              <table style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tài khoản</th>
                    <th>Họ Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Mật khẩu</th>
                    <th>Mã loại ND</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !search
                      ?
                      <Table navigate={navigate} users={currentUsers} loading={loading} />
                      :
                      <TableSearch navigate={navigate} usersSearch={prop.data} loading={loading} />
                  }
                </tbody>
              </table>
            </div>
          </CustomCard>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={user.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );

}
