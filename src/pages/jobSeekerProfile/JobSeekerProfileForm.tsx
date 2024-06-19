import React,{useState} from 'react'
import { MinusCircleOutlined, PlusOutlined ,LoadingOutlined} from '@ant-design/icons'
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
interface jobSeekerProfileProps {
    isDisabled?: boolean,
    profileData?: any,
    id?: any,
}

type jobSeekerProfileFieldType = {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    phoneNumber_temp?: string,
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
    profileData,
    id,
}) => {
    const [form] = Form.useForm();
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const onFinish: FormProps<jobSeekerProfileFieldType>['onFinish'] = async (values) => {
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
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValues={{ remember: true }}
                disabled={isDisabled}
                autoComplete='off'
                onFinish={onFinish}

            >
                <Form.Item<jobSeekerProfileFieldType> label="Personal Image">
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

                <Form.Item<jobSeekerProfileFieldType>
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <Button>{"Generate CV"}</Button>
                    <Button type='primary' htmlType='submit' disabled={false}>{false ? "Updating..." : "Update"}</Button>
                    <Button danger type="primary">Delete Profile</Button>
                </div>
            </Form>
        </div>
    )
}

export default JobSeekerProfileForm