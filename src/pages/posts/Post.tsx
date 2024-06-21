import React, { useState } from 'react'
import { Flex, message, Card, Image, Modal, Form, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps, } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};




interface PostProps {
  post: any,
  isPostOwned?: boolean,
}

const Post: React.FC<PostProps> = ({
  post,
  isPostOwned
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
  };
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
    <>
      <Card
        className='post-card'
        onClick={showModal}
      >
        <Image
          preview={false}
          className='post-image'
          width={'100%'}
          src={post?.imageUrl ?? '/src/assets/placeholder.jpg'}
        />
        <p className='post-text'
        >{post?.text}</p>
      </Card>
      <Modal
        width={600}
        title={isPostOwned ? "Edit Post" : "Post info"}
        open={isModalOpen}
        destroyOnClose
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        closable={true}
        maskClosable={true}
        okType='primary'
        footer={
          isPostOwned &&
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button onClick={handleUpdate} type="primary">Update</Button>
              <Button onClick={handleDelete} danger type="primary"> Delete</Button>
            </div>
          </>
        }
      >
        {
          isPostOwned
            ?
            <>
              <Form>
                <Flex gap="middle" wrap='wrap'>
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
                </Flex>
                <Form.Item style={{marginTop:'25px'}}>
                  <Input.TextArea name='text' value={post?.text} />
                </Form.Item>
              </Form>
            </>
            :
            <>
              <Image
                className='post-image'
                width={'100%'}
                src={post?.imageUrl ?? '/src/assets/placeholder.jpg'}
              />
              <p className='post-text' >{post?.text}{post?.text}{post?.text}{post?.text}</p>
            </>
        }
      </Modal>
    </>
  )
}

export default Post