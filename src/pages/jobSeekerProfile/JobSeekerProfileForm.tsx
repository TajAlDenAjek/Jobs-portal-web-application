import React, { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useUpdateProfileMutation, useGetProfileQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice';
import type { GetProp, UploadProps, } from 'antd';
import ResumePDF from './ResumePDF';
import PhoneInput from 'antd-phone-input';
import 'antd-phone-input/styles';
import { validateDate } from '../../componenets/validation/validationRules';
import FileUploader from '../../componenets/fileUploader/fileUploader';
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
    Spin
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

    const onFinish: FormProps<jobSeekerProfileFieldType>['onFinish'] = async (values) => {
        try {
            console.log(values)
            const userData = await update({ id: id, data: { ...values, personalImage: personalImage } }).unwrap()
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
                {/* List of Educations */}
                <Form.List name="educations">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item
                                    {...field}
                                    key={field.key}
                                    label={`Education ${field.key + 1}`}
                                >
                                    <Form.Item
                                        name={[field.name, 'title']}
                                        // fieldKey={[field.fieldKey, 'title']}
                                        rules={[{ required: true, message: 'Please input the title!' }]}
                                    >
                                        <Input placeholder="Title" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'startDate']}
                                        // fieldKey={[field.fieldKey, 'startDate']}
                                        rules={[{ required: true, message: 'Please select the start date!' }]}
                                    >
                                        <DatePicker placeholder="Start Date" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'endDate']}
                                        // fieldKey={[field.fieldKey, 'endDate']}
                                        rules={[{ required: true, message: 'Please select the end date!' }]}
                                    >
                                        <DatePicker placeholder="End Date" />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    <PlusOutlined /> Add Education
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                {/* List of Work Experiences */}
                <Form.List name="workExperiences">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item
                                    {...field}
                                    key={field.key}
                                    label={`Work Experience ${field.key + 1}`}
                                >
                                    <Form.Item
                                        name={[field.name, 'titleWork']}
                                        // fieldKey={[field.fieldKey, 'titleWork']}
                                        rules={[{ required: true, message: 'Please input the job title!' }]}
                                    >
                                        <Input placeholder="Job Title" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'startDateWork']}
                                        // fieldKey={[field.fieldKey, 'startDateWork']}
                                        rules={[{ required: true, message: 'Please select the start date!' }]}
                                    >
                                        <DatePicker placeholder="Start Date" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'endDateWork']}
                                        // fieldKey={[field.fieldKey, 'endDateWork']}
                                        rules={[{ required: true, message: 'Please select the end date!' }]}
                                    >
                                        <DatePicker placeholder="End Date" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'isCurrentlyEmployed']}
                                        // fieldKey={[field.fieldKey, 'isCurrentlyEmployed']}
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Is Currently Employed</Checkbox>
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    <PlusOutlined /> Add Work Experience
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                {/* List of Skills */}
                <Form.List name="skills">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item
                                    {...field}
                                    key={field.key}
                                    label={`Skill ${field.key + 1}`}
                                >
                                    <Form.Item
                                        name={[field.name, 'skill']}
                                        // fieldKey={[field.fieldKey, 'skill']}
                                        rules={[{ required: true, message: 'Please input the skill!' }]}
                                    >
                                        <Input placeholder="Skill" />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    <PlusOutlined /> Add Skill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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