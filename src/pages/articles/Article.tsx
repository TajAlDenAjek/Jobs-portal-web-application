import React, { useState } from 'react'
import { Flex, message, Card, Image, Modal, Form, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps, } from 'antd';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import { useDeleteArticleMutation, useUpdateArticleMutation } from '../../features/articles/articlesApiSlice';
interface ArticleProps {
  article: any,
  isArticleOwned?: boolean,
}

const Article: React.FC<ArticleProps> = ({
  article,
  isArticleOwned
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateArticle, { isLoading }] = useUpdateArticleMutation();
  const [deleteArticle, { }] = useDeleteArticleMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteArticle(article?._id).unwrap()
      message.success('article Deleted ')
      setIsModalOpen(false);
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

  const onFinish = async (values) => {
    try {
      const articleData = await updateArticle({
        id: article?._id,
        data: {
          ...values,
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
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>
          <Image
            preview={false}
            width={'40px'}
            style={{ borderRadius: '50%' }}
            src={article?.companyImage ?? '/src/assets/avatar.jfif'}
          />
          <p className='article-text'>{article?.companyName}</p>
        </div>
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
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>
                <Image
                  preview={false}
                  width={'40px'}
                  style={{ borderRadius: '50%' }}
                  src={article?.companyImage ?? '/src/assets/avatar.jfif'}
                />
                <p className='article-text'>{article?.companyName}</p>
              </div>
              <p className='article-text'
              >{article?.text}</p>
            </>
        }
      </Modal>
    </>
  )
}

export default Article