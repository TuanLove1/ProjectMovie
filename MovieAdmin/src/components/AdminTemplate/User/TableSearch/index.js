import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actDeleteUser } from '../DeleteUser/actions';
import { actEditUser } from '../EditUser/reducer/actions';
const TableSearch = ({ usersSearch, loading, navigate }) => {
    let dispatch = useDispatch()
    if (loading) {
        return <h2>Loading...</h2>;
    }
    console.log(usersSearch);
    return usersSearch?.map((user, index) => {
        return <tr key={index}>
            <td>{index}</td>
            <td>{user.taiKhoan}</td>
            <td>{user.hoTen}</td>
            <td>{user.email}</td>
            <td>{user.soDT}</td>
            <td>{user.matKhau}</td>
            <td>{user.maLoaiNguoiDung}</td>
            <td>
                <i onClick={() => {
                    console.log(user.taiKhoan);
                    dispatch(actDeleteUser(user.taiKhoan))
                }} class="fas fa-trash-alt xoa"></i>
                <i onClick={() => {
                    Object.assign(user, { maNhom: "GP10" });
                    dispatch(actEditUser(user))
                    navigate('/admin/edit-user', user)
                }} class="fas fa-edit edit"></i>
            </td>
        </tr>
    })
};

export default TableSearch;