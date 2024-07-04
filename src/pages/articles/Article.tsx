import React, { useState } from 'react'
import { Flex, message, Card, Image, Modal, Form, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps, } from 'antd';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import { useUpdatePostMutation, useDeletePostMutation } from '../../features/post/postApiSlice';

interface ArticleProps {
  article: any,
  isArticleOwned?: boolean,
}

const Article: React.FC<ArticleProps> = ({
  article,
  isArticleOwned
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
      await deletePost(article?._id).unwrap()
      message.success('article Deleted ')
      setIsModalOpen(false);
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

  const [imageUrl, setImageUrl] = useState<string>(article?.imageUrl ?? '');
  const onFinish = async (values) => {
    try {
      const postData = await updatePost({
        id: article?._id,
        data: {
          ...values,
          imageUrl: imageUrl
        }
      }).unwrap()
      setIsModalOpen(false)
      message.success('article update Successful')
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

  return (
    <>
      <Card
        className='article-card'
        onClick={showModal}
      >
        <Image
          preview={false}
          className='article-image'
          width={'100%'}
          src={article?.imageUrl ?? '/src/assets/placeholder.jpg'}
        />
        <p className='article-text'
        >{article?.text}</p>
      </Card>
      <Modal
        width={600}
        title={isArticleOwned ? "Edit Article" : "Article info"}
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
          isArticleOwned
            ?
            <>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                initialValues={article}
              >
                <Form.Item style={{ marginTop: '25px' }} label="article Image">
                  <FileUploader url={imageUrl} setUrl={setImageUrl} />
                </Form.Item>
                <Form.Item style={{ marginTop: '25px' }}
                  name={'text'}
                  label={'Article text'}
                  rules={[{ required: true, message: 'Enter article text at least 30 chars', min: 30, max: 1000 }]}>
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
                className='article-image'
                width={'100%'}
                src={article?.imageUrl ?? '/src/assets/placeholder.jpg'}
              />
              <p className='article-text' >{article?.text}</p>
            </>
        }
      </Modal>
    </>
  )
}

export default Article