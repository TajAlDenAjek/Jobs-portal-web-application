import React, { useState } from 'react'
import { Flex, message, Card, Image, Modal, Form, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps, } from 'antd';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import { useUpdatePostMutation, useDeletePostMutation } from '../../features/post/postApiSlice';

interface PostProps {
  post: any,
  isPostOwned?: boolean,
}

const Post: React.FC<PostProps> = ({
  post,
  isPostOwned
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost, {  }] = useDeletePostMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deletePost(post?._id).unwrap()
      message.success('Post Deleted ')
      setIsModalOpen(false);
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

  const [imageUrl, setImageUrl] = useState<string>(post?.imageUrl ?? '');
  const onFinish = async (values) => {
    try {
      const postData = await updatePost({
        id: post?._id,
        data: {
          ...values,
          imageUrl: imageUrl
        }
      }).unwrap()
      setIsModalOpen(false)
      message.success('Post update Successful')
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

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
          <>
          </>
        }
      >
        {
          isPostOwned
            ?
            <>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                initialValues={post}
              >
                <Form.Item style={{ marginTop: '25px' }} label="Post Image">
                  <FileUploader url={imageUrl} setUrl={setImageUrl} />
                </Form.Item>
                <Form.Item style={{ marginTop: '25px' }}
                  name={'text'}
                  label={'Post text'}
                  rules={[{ required: true, message: 'Enter post text at least 30 chars', min: 30, max: 1000 }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button htmlType='submit' type="primary" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
                  <Button onClick={handleDelete} danger type="primary"> Delete</Button>
                </div>
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