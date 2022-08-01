import { CustomCard } from '@tsamantanis/react-glassmorphism'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actUpdateUser } from '../Update/actions'
class EditUser extends Component {
  state = {
    value: {
      taiKhoan: this.props.taiKhoan,
      matKhau: this.props.matKhau,
      email: this.props.email,
      soDt: this.props.soDT,
      maNhom: 'GP10',
      maLoaiNguoiDung: 'KhachHang',
      hoTen: this.props.hoTen,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    this.props.updateUser(this.state.value)
  }
  handleOnChange = (e) => {
    let { value, id } = e.target;
    let newValue = { ...this.state.value };
    newValue[id] = value;

    this.setState({
      value: newValue,
    })

  }
  componentWillReceiveProps(newProps) { //Lifecycle này kích hoạt khi props của component thay đổi và trước khi render
    //Đem props gán vào state => giao diện binding từ state
    this.setState({
      value: newProps.user
    })
  }
  render() {
    console.log(this.props);
    let { taiKhoan, matKhau, email, soDT, maNhom, maLoaiNguoiDung, hoTen } = this.state.value;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CustomCard className="form_mobile"
          effectColor='rgba(54, 215, 183, 1)' // required
          color="#14AEFF" // default color is white
          blur={3} // default blur value is 10px
          borderRadius={0}
           // default border radius value is 10px
        >
          <h1 style={{color:'white'}}>Sửa Người Dùng</h1>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column',width:'80%',marginLeft:'10%',color:'#00d8ff;' }}>

            <label>
              Tài khoản:
            </label>
            <input id='taiKhoan' value={taiKhoan} name='taiKhoan' type="text" onChange={this.handleOnChange}
            />
            <label>Mật khẩu:
            </label>
            <input id='matKhau' value={matKhau} name='matKhau' type="text" onChange={this.handleOnChange} />

            <label>Email:</label>
            <input id='email' value={email} data-type={"emailType"} name='email' type="text" onChange={this.handleOnChange} />

            <label>Số điện thoại: </label>
            <input id='soDt' value={soDT} name='soDt' type="text" onChange={this.handleOnChange} />
            <label>Mã nhóm: </label>
            <input id='maNhom' value={maNhom} name='maNhom' type="text" onChange={this.handleOnChange} />
            <label>Mã loại người dùng:</label>
            <select id='maLoaiNguoiDung' value={maLoaiNguoiDung} name='maLoaiNguoiDung' onChange={this.handleOnChange} >
              <option value='KhachHang'>Khách Hàng</option>
              <option value='QuanTri'>Quản Trị</option>
            </select>

            <label>Họ tên:</label>
            <input id='hoTen' value={hoTen} name='hoTen' type="text" onChange={this.handleOnChange} />

            <button className='btn btn-primary mt-2' type='submit'>Update</button>
          </form>
          </CustomCard>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {

  return {
    user: rootReducer.editUserReducer.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(actUpdateUser(user))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditUser);




