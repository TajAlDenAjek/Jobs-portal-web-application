import React, { useState } from 'react'
import ArticlesList from './ArticlesList';
import { Flex, message, Card, Image, Modal, Form, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps, } from 'antd';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import { Empty, Spin } from 'antd';
import { useCreateArticleMutation,useGetArticlesQuery } from '../../features/articles/articlesApiSlice';

const CurrenetUserArticles = () => {
  const { data: articles, isLoading: isArticlesLoading, isSuccess, isError } = useGetArticlesQuery({})
  let content = <Empty />
  if (isArticlesLoading) {
    content = <Spin />
  } else if (isSuccess) {
    content = (
      <ArticlesList articles={articles?.articles} isArticleOwned={true} />
    )
    if (!articles?.articles || articles?.articles?.length === 0) {
      content = <Empty />
    }
  }
  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };



  const onFinish = async (values) => {
    try {
      const ArticleData = await createArticle({
        ...values,
      }).unwrap()
      setIsModalOpen(false)
      message.success('Article Created ')
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
        <div>
          <Button onClick={showModal}> Create new article </Button>
        </div>
        {content}
      </div>
      <Modal
        width={600}
        title={"Create Article"}
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
            <Form.Item style={{ marginTop: '25px' }}
              name={'text'}
              label={'Article text'}
              rules={[{ required: true, message: 'Enter Article text at least 30 chars', min: 30, max: 1000 }]}>
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

export default CurrenetUserArticles