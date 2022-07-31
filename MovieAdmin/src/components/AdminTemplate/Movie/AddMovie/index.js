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
import React, { useState } from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { actAddMovie } from './reducer/actions';
import { useNavigate } from 'react-router-dom';

export default function AddMovie() {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImg] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            ngayKhoiChieu: "",
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            console.log('value', values)
            values.maNhom = 'GP10';
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            dispatch(actAddMovie(formData,navigate))
            
        }
    });
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const hangdleChangeDate = (values) => {
        let day = moment(values).format('DD/MM/YYYY');
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
            <h3>Thêm phim</h3>
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
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={'DD/MM/YYYY'} onChange={hangdleChangeDate} />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleSwitch('hot')} />
                </Form.Item>
                <Form.Item label="Đánh giá (Số sao)">
                    <InputNumber onChange={handleSwitch('danhGia')} min={1} max={10} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type='file' onChange={handleChangeFile} />
                    <img style={{ width: 100, height: 100, objectFit: 'cover' }} src={imgSrc} alt='..' />
                </Form.Item>
                <Form.Item label="Xác nhận">
                    <button className='btn btn-primary' type='submit'>Thêm phim</button>
                </Form.Item>
                
            </Form>
        </>
    );
}
