import React, { useState } from 'react'
import { UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'

import type { GetProp, UploadProps, } from 'antd';
import {
    message,
    Button,
    Upload,
} from 'antd'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

interface fileUploaderProps {
    url?: any,
    setUrl?: any,
    isPdf?: boolean,
}
const FileUploader: React.FC<fileUploaderProps> = ({
    url, setUrl,
    isPdf = false
}) => {
    const userToken = useSelector(selectCurrentToken)
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(url);
    const handleOnChangePdf = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        if(info?.fileList?.length ===0){
            setUrl('')
        }
    }
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
        if(info?.fileList?.length ===0){
            setUrl('')
        }
    };
    const handleCustomRequest = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;
        const token = userToken;
        const fmData = new FormData();
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            // onUploadProgress: event => {
            //     console.log((event.loaded / event.total) * 100);
            //     onProgress({ percent: (event.loaded / event.total) * 100 }, file);
            // }
        };
        fmData.append("image", file);
        axios
            .post("http://localhost:3000/auth/addImage", fmData, config)
            .then(res => {
                onSuccess(file);
                setUrl(res?.data?.fileUrl)
            })
            .catch(err => {
                const error = new Error('Some error');
                onError({ event: error });
            });


    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        !isPdf ?
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                maxCount={1}
                onChange={handleChange}
                customRequest={handleCustomRequest}
                showUploadList={false}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            :
            <Upload
                name="file"
                // className=""
                accept=".pdf,.doc,.docx"
                maxCount={1}
                onChange={handleOnChangePdf}
                customRequest={handleCustomRequest}

            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

    )
}
export default FileUploader