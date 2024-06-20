import React, { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons'
import { useUpdateProfileMutation, useGetProfileQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice';
import type { GetProp, UploadProps, } from 'antd';
import ResumePDF from './ResumePDF';
import PhoneInput from 'antd-phone-input';
import 'antd-phone-input/styles';
import { validateDate } from '../../componenets/validation/validationRules';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import MultipleStringsInput from '../../componenets/multipleStringsInput/MultipleStringsInput';
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
    Spin, Tag

} from 'antd'

const { Option } = Select;
import type { FormProps } from 'antd'
import './style.scss'
import { pdf } from '@react-pdf/renderer';
import { jobSeekerObjectToForm } from '../../componenets/helpers'



interface jobSeekerProfileProps {
    isDisabled?: boolean,
    id?: any,
}

type jobSeekerProfileFieldType = {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    gender?: "male" | "female",
    birthDate?: string,
    country?: string,
    personalImage?: string,
    descriptionOrSummary?: string,
    education?: any,
    workExperience?: any,
    skills?: any,
}


const JobSeekerProfileForm: React.FC<jobSeekerProfileProps> = ({
    isDisabled = false,
    id,
}) => {
    const [form] = Form.useForm();
    const {
        data,
        isSuccess
    } = useGetProfileQuery(id)
    const [update, { isLoading }] = useUpdateProfileMutation()


    const [resumeData, setResumeData] = useState<any>({
        // Initialize your resume data here
    });

    const handleGeneratePDF = async () => {
        console.log(form.getFieldsValue())
        setResumeData(data?.user)
        try {
            const blob = await pdf(<ResumePDF props={resumeData} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resume.pdf';
            link.click();
            URL.revokeObjectURL(url); // Clean up memory
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        }
    };
    const [personalImage, setPersonalImage] = useState(data?.user?.personalImage ?? '')

    const [skills, setSkills] = useState([]);
    const onFinish: FormProps<jobSeekerProfileFieldType>['onFinish'] = async (values) => {
        try {
            console.log(values)
            // const newSkills = values.stringList.split('\n').map((item) => item.trim());
            // setSkills(newSkills);
            const userData = await update({ id: id, data: { ...values, personalImage: personalImage, skills: skills } }).unwrap()
            message.success('Update Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    

    let content = <Spin />
    if (isSuccess) {
        content =
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                disabled={isDisabled}
                autoComplete='off'
                onFinish={onFinish}
                initialValues={jobSeekerObjectToForm(data?.user)}
                onKeyDown={(e)=> e.key == "Enter" ? e.preventDefault(): ''}

            >
                <Form.Item<jobSeekerProfileFieldType> label="Personal Image">
                    <FileUploader setUrl={setPersonalImage} url={personalImage} />
                </Form.Item>
                <Upload />
                <Form.Item<jobSeekerProfileFieldType> name="firstName" label="First Name"
                    rules={[{ required: true, message: 'Please Enter your First name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="lastName" label="Last Name"
                    rules={[{ required: true, message: 'Please Enter your Last name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="email" label="Email"
                    rules={[{ required: true, message: 'Please Enter your email' }]}
                >
                    <Input type='email' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="password" label="Password"
                    rules={[{ required: true, message: 'Please Enter your password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType>
                    name="descriptionOrSummary"
                    label="Summary"
                    rules={[{ required: true, message: 'Please input your Summary!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> label="Gender" name={"gender"}>
                    <Radio.Group>
                        <Radio value="male"> Male </Radio>
                        <Radio value="female"> Female </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="phoneNumber" label="Phone Numbe"
                    rules={[{ required: false, message: 'Enter a vaild phone number', min: 10, max: 10 }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="country" label="Country"
                    rules={[{ required: false, message: 'Enter a vaild country ' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="birthDate" label="Birth Date"
                    rules={[{ validator: validateDate, }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> label="Skills">
                    <MultipleStringsInput apiItems={data?.user?.skills} setApiItems={setSkills} placeholder={"Enter a new skill"}/>
                </Form.Item>
                {
                    !isDisabled &&
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <Button onClick={handleGeneratePDF}>{"Generate CV"}</Button>
                        <Button type='primary' htmlType='submit' disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
                        <Button danger type="primary">Delete Profile</Button>
                    </div>
                }
            </Form>
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default JobSeekerProfileForm