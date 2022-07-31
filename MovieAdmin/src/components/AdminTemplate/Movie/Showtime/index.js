import React, { useEffect, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { api } from '../../../../api/apiUtil';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import "./style.css"


import moment from 'moment';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
export default function (props) {
    const navigate = useNavigate();
    const params = useParams();
    const formik = useFormik({
        initialValues: {
            maPhim: params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: 0
        },
        validationSchema: yup.object().shape({
            ngayChieuGioChieu: yup.string().required('Bạn chưa chọn ngày,giờ,chiếu!!!'),
        }),
        onSubmit: (value) => {
            console.log(value);
            postDataInfoLichChieu(value);
        }

    })

    const [state, setState] = useState({
        heThongRap: [],
        cumRap: [],
    })
    const postDataInfoLichChieu = (info) => {
        api.post(`QuanLyDatVe/TaoLichChieu`, info)
            .then((result) => {
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>{result.data.content}</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success',
                    show: false
                });
                navigate('/admin/movie')
            })
            .catch((error) => {
                console.log(error.response);
            })
    }
    const fectDataHeThongRap = () => {
        api.get('QuanLyRap/LayThongTinHeThongRap')
            .then((result) => {
                console.log(result.data.content);
                setState({
                    ...state, heThongRap: result.data.content
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const fectDataCumRap = (tenCumRap) => {
        api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${tenCumRap}`)
            .then((result) => {
                setState({
                    ...state, cumRap: result.data.content
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        fectDataHeThongRap();
    }, [])

    const handleChangeHtr = (value) => {
        fectDataCumRap(value)
    }
    const onChangeDate = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onChangePrice = (value) => {
        formik.setFieldValue('giaVe', value)
    }
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }
    const handleOptionHtr = () => {
        return state.heThongRap?.map((htr, index) => {
            return {
                label: htr.maHeThongRap, value: htr.maHeThongRap
            }
        })
    }
    const handleOptionCumRap = () => {
        return state.cumRap?.map((cumrap, index) => {
            return {
                label: cumrap.tenCumRap, value: cumrap.maCumRap
            }
        })
    }
    return (
        <div>
            <CustomCard className="form_mobile" style={{padding:'100px 150px'}}
                effectColor='rgba(54, 215, 183, 1)' // required
                color="#14AEFF" // default color is white
                blur={2} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <Form onSubmitCapture={formik.handleSubmit}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}

                >
                    <h1 style={{color:'white'}}>Tạo lịch chiếu</h1>
                    <Form.Item
                        label="Hệ thống rạp"
                    >
                        <Select options={handleOptionHtr()} onChange={handleChangeHtr} placeholder='Hệ thống rạp' />
                    </Form.Item>
                    <Form.Item
                        label="Cụm rạp"
                    >
                        <Select options={handleOptionCumRap()} onChange={handleChangeCumRap} placeholder='Chọn cụm rạp' />
                    </Form.Item>
                    <Form.Item
                        label="Lịch chiếu"
                    >
                        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                        <div className='text-danger'>{formik.errors.ngayChieuGioChieu}</div>

                    </Form.Item>
                    <Form.Item
                        label="Giá vé"
                    >
                        <InputNumber min={80000} onChange={onChangePrice} />

                    </Form.Item>
                    <Form.Item
                        label="Chức năng"
                    >
                        <Button htmlType='submit'>Tạo lịch chiếu</Button>
                    </Form.Item>
                </Form>
            </CustomCard>
        </div>

    )
}
