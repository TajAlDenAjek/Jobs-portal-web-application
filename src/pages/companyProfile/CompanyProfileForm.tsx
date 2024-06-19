import React, { useState } from 'react'
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import type { GetProp, UploadProps, } from 'antd';
import PhoneInput from 'antd-phone-input';
import 'antd-phone-input/styles';
import {
    Form, message, Input, Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd'
const { Option } = Select;
import type { FormProps } from 'antd'
import './style.scss'
import { pdf } from '@react-pdf/renderer';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
interface CompanyProfileProps {
    isDisabled?: boolean,
    profileData?: any,
    id?: any,
}

type CompanyProfileFieldType = {
    email?: string,
    password?: string,
    companyName?: string,
    phoneNumber?: string,
    phoneNumber_temp?: string,
    country?: string,
    CompanyImage?: string,
}


const CompanyProfileForm: React.FC<CompanyProfileProps> = ({
    isDisabled = false,
    profileData,
    id,
}) => {

    const [form] = Form.useForm();


    const onFinish: FormProps<CompanyProfileFieldType>['onFinish'] = async (values) => {
        try {
            console.log(values)
            message.success('Update Successful')
            // form.resetFields()
            // navigate('/')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <div>
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValues={{ remember: true }}
                disabled={isDisabled}
                autoComplete='off'
                onFinish={onFinish}

            >
                <Form.Item<CompanyProfileFieldType> label="Personal Image">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Upload />
                <Form.Item<CompanyProfileFieldType> name="companyName" label="Company Name"
                    rules={[{ required: true, message: 'Please Enter your First name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<CompanyProfileFieldType> name="email" label="Email"
                    rules={[{ required: true, message: 'Please Enter your email' }]}
                >
                    <Input type='email' />
                </Form.Item>
                <Form.Item<CompanyProfileFieldType> name="password" label="Password"
                    rules={[{ required: true, message: 'Please Enter your password' }]}
                >
                    <Input.Password />
                </Form.Item>
    
                <Form.Item<CompanyProfileFieldType>
                    name="phoneNumber_temp"
                    label="Phone Number"
                >
                    <PhoneInput
                        country={"sy"}
                        disableDropdown={false}
                        enableSearch={true}
                        excludeCountries={['il']}
                    />
                </Form.Item>
             
              
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <Button type='primary' htmlType='submit' disabled={false}>{false ? "Updating..." : "Update"}</Button>
                    <Button danger type="primary">Delete Account</Button>
                </div>
            </Form>
        </div>
    )
}

export default CompanyProfileForm