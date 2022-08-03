import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fectDataInfoMovie } from './reducer/actions';
import { actUpdateMovie } from '../AddMovie/UpdateMovie/reducer/actions';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import styled from './style.css';

export default function EditMovie() {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImg] = useState('')
    let navigate = useNavigate()
    const props = useSelector((state) => state.infoMovieReducer)
    const dispatch = useDispatch();
    const params = useParams();
    const { data } = props;
    useEffect(() => {
        dispatch(fectDataInfoMovie(params.id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maphim: data?.maPhim,
            tenPhim: data?.tenPhim,
            trailer: data?.trailer,
            moTa: data?.moTa,
            ngayKhoiChieu: data?.ngayKhoiChieu,
            dangChieu: data?.dangChieu,
            sapChieu: data?.sapChieu,
            hot: data?.hot,
            danhGia: data?.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {
            console.log('value', values)
            values.maNhom = 'GP10';
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            dispatch(actUpdateMovie(formData, navigate));
        }
    });
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const hangdleChangeDate = (values) => {
        let day = moment(values)
        formik.setFieldValue('ngayKhoiChieu', day)
    }
    const handleSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImg(e.target.result)
            }
        }
        formik.setFieldValue('hinhAnh', file);
    }

    return (
        <>
            <CustomCard className="form_mobile"
                
                effectColor='rgba(54, 215, 183, 1)' // required
                color="#14AEFF" // default color is white
                blur={3} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <h3 style={{ color: 'white',textAlign:'center',fontSize:'40px' }}>Sửa phim</h3>
                <Form onSubmitCapture={formik.handleSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                >
                    <Form.Item label="Form Size"  name="size">
                        <Radio.Group>
                            <Radio.Button value="small">Small</Radio.Button>
                            <Radio.Button value="default">Default</Radio.Button>
                            <Radio.Button value="large">Large</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Tên phim">
                        <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                    </Form.Item>
                    <Form.Item label="Trailer">
                        <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                    </Form.Item>
                    <Form.Item label="Ngày khởi chiếu">
                        <DatePicker format={'DD/MM/YYYY'} onChange={hangdleChangeDate} value={moment(formik.values.ngayKhoiChieu)} />
                    </Form.Item>
                    <Form.Item label="Đang chiếu" valuePropName="checked">
                        <Switch onChange={handleSwitch('dangChieu')} checked={formik.values.dangChieu} />
                    </Form.Item>
                    <Form.Item label="Sắp chiếu" valuePropName="checked">
                        <Switch onChange={handleSwitch('sapChieu')} checked={formik.values.sapChieu} />
                    </Form.Item>
                    <Form.Item label="Hot" valuePropName="checked">
                        <Switch onChange={handleSwitch('hot')} checked={formik.values.hot} />
                    </Form.Item>
                    <Form.Item label="Đánh giá (Số sao)">
                        <InputNumber onChange={handleSwitch('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh">
                        <input type='file' onChange={handleChangeFile} />
                        <img style={{ width: 100, height: 100, objectFit: 'cover' }} src={imgSrc == '' ? data?.hinhAnh : imgSrc} alt='..' />
                    </Form.Item>
                    <Form.Item label="Xác nhận">
                        <button className='btn btn-primary' type='submit'>Cập nhật</button>
                    </Form.Item>
                </Form>
            </CustomCard>
        </>
    );
}
