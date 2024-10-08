import React, { useState } from 'react'
import PostsList from './PostsList'
import { Flex, message, Card, Image, Modal, Form, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps, } from 'antd';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import { useCreatePostMutation, useGetUserPostsQuery } from '../../features/post/postApiSlice';
import { Empty, Spin } from 'antd';

const CurrenetUserPosts = () => {
  const { data: posts, isLoading: isPostsLoading, isSuccess, isError } = useGetUserPostsQuery({})
  let content = <Empty />
  if (isPostsLoading) {
    content = <Spin />
  } else if (isSuccess) {
    content = (
      <PostsList posts={posts?.posts} isPostOwned={true} />
    )
    if (!posts?.posts || posts?.posts?.length === 0) {
      content = <Empty />
    }
  }
  const [createPost, { isLoading }] = useCreatePostMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [imageUrl, setImageUrl] = useState<string>();


  const onFinish = async (values) => {
    try {
      const postData = await createPost({
        ...values,
        imageUrl: imageUrl
      }).unwrap()
      setIsModalOpen(false)
      message.success('Post Created ')
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
        <div>
          <Button onClick={showModal}> Create new post </Button>
        </div>
        {content}
      </div>
      <Modal
        width={600}
        title={"Create Post"}
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
        <>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
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
              <Button htmlType='submit' type="primary" disabled={isLoading}>{isLoading ? "Creating..." : "Create"}</Button>
            </div>
          </Form>
        </>
      </Modal >
    </>
  )
}

export default CurrenetUserPosts