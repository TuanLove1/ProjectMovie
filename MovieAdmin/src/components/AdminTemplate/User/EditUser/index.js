import React, { Component } from 'react'
import { connect } from 'react-redux'
class EditUser extends Component {
  state = {
    value: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: 'GP10',
      maLoaiNguoiDung: 'KhachHang',
      hoTen: ''
    }
  }
  handleOnChange = (e) => {
    e.preventDefault()
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
    let { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } = this.state.value;
    return (
      <div>
        <h1>Thêm Người Dùng Quản Lý</h1>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', }}>

          <label>
            Tài khoản:
          </label>
          <input id='taiKhoan' value={taiKhoan} name='taiKhoan' type="text" onChange={this.hanleOnChange}
          />
          <label>Mật khẩu:
          </label>
          <input value={matKhau} name='matKhau' type="text" />

          <label>Email:</label>
          <input data-type={"emailType"} name='email' type="text" />

          <label>Số điện thoại: </label>
          <input name='soDt' type="text" />
          <label>Mã nhóm: </label>
          <input name='maNhom' type="text" />
          <label>Mã loại người dùng:</label>
          <select name='maLoaiNguoiDung' >
            <option value='KhachHang'>Khách Hàng</option>
            <option value='QuanTri'>Quản Trị</option>
          </select>

          <label>Họ tên:</label>
          <input name='hoTen' type="text" onChange={this.handleOnChange} />

          <button className='btn btn-primary' type='submit'>Thêm</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {

  return {
    user: rootReducer.editUserReducer.data
  }
}



export default connect(mapStateToProps)(EditUser);




