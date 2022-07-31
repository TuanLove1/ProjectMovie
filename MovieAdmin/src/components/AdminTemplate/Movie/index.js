import React, { Fragment, useEffect, useState } from 'react'
import { Table } from 'antd';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchDataListMovie } from './reducer/actions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { FetchDataDeleteMovie } from './DeleteMovie/actions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
export default function Movie() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchDataListMovie())
  }, [])
  const props = useSelector((state) => state.ListMovieAdminReducer)
  console.log(props.data);
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
      width: '15%'
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (text, film) => {
        return <>
          <img style={{ objectFit: 'cover' }} src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} />
        </>
      },
      width: '15%'
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return -1
        }
        return 1
      },
      width: '25%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      sorter: (a, b) => {
        let motaA = a.moTa.toLowerCase().trim();
        let motaB = b.moTa.toLowerCase().trim();
        if (motaA > motaB) {
          return -1
        }
        return 1
      },

      render: (text, film) => {
        return <>
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
        </>
      },
      width: '25%'
    },
    {
      title: 'Hành động',
      dataIndex: 'maPhim',
      render: (text, film) => {
        return <div style={{ display: 'flex' }}>
          <EditIcon onClick={() => {
            navigate(`/admin/edit-movie/${film.maPhim}`)
          }} style={{ color: 'white', cursor: 'pointer', backgroundColor: '1890ff', borderRadius: '5px', fontSize: '28px', marginRight: '5px' }}></EditIcon>

          <DeleteForeverIcon onClick={() => {
            console.log(film.maPhim);
            dispatch(FetchDataDeleteMovie(film.maPhim))
          }} style={{ color: 'white', cursor: 'pointer', backgroundColor: 'red', borderRadius: '5px', fontSize: '28px', marginRight: '5px' }} type="button">Xác nhận</DeleteForeverIcon>

          <CalendarMonthIcon onClick={() => {
            navigate(`/admin/show-time/${film.maPhim}`)
          }} style={{ color: 'white', cursor: 'pointer', backgroundColor: 'green', borderRadius: '5px', fontSize: '28px' }}></CalendarMonthIcon>
        </div>
      },
      width: '20%'
    },
  ];
  const { data, loading } = props;

  const { Search } = Input;

  if (loading) return <GridLoader color='rgba(54, 215, 183, 1)' />
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const onSearch = (value) => dispatch(FetchDataListMovie(value));

  return (
    <>
      <div className='grid wide'>
        <div className='row'>
          <div className='col l-12'>
            <CustomCard className="form_mobile"
              effectColor='rgba(54, 215, 183, 1)' // required
              color="#14AEFF" // default color is white
              blur={5} // default blur value is 10px
              borderRadius={0} // default border radius value is 10px
            >
              <h1 style={{ color: 'white' }} className='text-center'>Quản lý phim</h1>
              <Button onClick={() => {
                navigate(`/admin/add-movie`)
              }} className='mb-2' variant="contained">Thêm phim</Button>
              <Search className='mb-2' placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
              <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
            </CustomCard>
          </div>
        </div>
      </div>
    </>
  )
}
