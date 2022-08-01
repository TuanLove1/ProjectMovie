import { CustomCard } from '@tsamantanis/react-glassmorphism';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actAddUser } from './reducer/actions';
export default function AddUser() {
    const dispatch = useDispatch();
    const props = useSelector((state) => state.addUserReducer)
    let navigate = useNavigate()
    const [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: 'GP10',
            maLoaiNguoiDung: 'KhachHang',
            hoTen: ''
        },
        errors: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: '',
            maLoaiNguoiDung: 'KhachHang',
            hoTen: ''
        }
    })
    const handleChange = (event) => {
        let type = event.target.getAttribute('data-type');
        let { name, value } = event.target;

        let newValue = { ...state.values, [name]: value }
        let newErrors = { ...state.errors }
        if (value.trim() === '') {
            newErrors[name] = name + ' is not required !!!'
        }
        if (type === 'emailType') {
            let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!regexEmail.test(value)) {
                //có dấu ! phủ định
                newErrors[name] = name + ' không đúng định dạng !';
            } else {
                newErrors[name] = ''
            }
        }
        setState({
            values: newValue,
            errors: newErrors
        });
        console.log(name, value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actAddUser(state.values, navigate));
    }
    return (
        <div style={{display: 'flex',justifyContent:'center'}}>
            <CustomCard className="form_mobile"
                effectColor='rgba(54, 215, 183, 1)' // required
                color="#14AEFF" // default color is white
                blur={3} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <h1 style={{color:'white'}}>Thêm Người Dùng</h1>
                <form  onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width:'80%',marginLeft:'10%',color:'#00d8ff;'}}>
                    <label>
                        Tài khoản:
                    </label>
                    <input value={state.values.taiKhoan} name='taiKhoan' type="text" onChange={handleChange}
                    />
                    <p className='text-danger'>{state.errors.taiKhoan}</p>
                    <label>Mật khẩu:
                    </label>
                    <input value={state.values.matKhau} name='matKhau' type="text" onChange={handleChange} />
                    <p className='text-danger'>{state.errors.matKhau}</p>

                    <label>Email:</label>
                    <input data-type={"emailType"} value={state.values.email} name='email' type="text" onChange={handleChange} />
                    <p className='text-danger'>{state.errors.email}</p>

                    <label>Số điện thoại: </label>
                    <input value={state.values.soDt} name='soDt' type="text" onChange={handleChange} />
                    <p className='text-danger'>{state.errors.soDt}</p>
                    <label>Mã nhóm: </label>
                    <input value={state.values.maNhom} name='maNhom' type="text" onChange={handleChange} />
                    <p className='text-danger'>{state.errors.maNhom}</p>
                    <label>Mã loại người dùng:</label>
                    <select name='maLoaiNguoiDung' onChange={handleChange}>
                        <option value='KhachHang'>Khách Hàng</option>
                        <option value='QuanTri'>Quản Trị</option>
                    </select>

                    <label>Họ tên:</label>
                    <input value={state.values.hoTen} name='hoTen' type="text" onChange={handleChange} />
                    <p className='text-danger'>{state.errors.hoTen}</p>

                    <button className='btn btn-primary' type='submit'>Thêm</button>
                </form>
            </CustomCard>
        </div>
    )
}
