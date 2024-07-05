import React, { useState } from 'react'
import AdminTable from '../../componenets/adminTable/AdminTable'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Spin, Empty } from 'antd'
import CompanyProfile from '../companyProfile/CompanyProfile';
import { Modal, Button, message } from 'antd'
import { useGetCompaniesQuery,useApproveCompanyMutation,useDeleteCompanyMutation } from '../../features/admin/adminApiSlice';
const CompanyTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<any>(null)
  const [deleteRecord, { }] = useDeleteCompanyMutation()
  const [update, {  }] = useApproveCompanyMutation()
  const handleDelete = async (id: any) => {
    try {
      await deleteRecord(id).unwrap()
      message.success('Account Deleted Successful')
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }
  const handleApprove = async (id: any) => {
    try {
      const companyData = await update({
        id: id, data: {
          isApproved: true,
        }
      }).unwrap()
      message.success('Update Successful')
    } catch (error: any) {
      message.error('Something went wrong')
    }
  }
  const {
    data,
    currentData,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCompaniesQuery({})
  const columns: TableProps['columns'] = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      filterSearch: true,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Is Approved',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (_, record) => <Tag color={record?.isApproved ? 'green' : 'red'}>{record?.isApproved ? 'Approved' : 'Not Approved'}</Tag>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {

            setCurrentProfile(record)
            setIsModalOpen(true)
          }
          }>View</a>
          <a onClick={() => {
            handleDelete(record._id)
          }
          }>Delete</a>
          {
            !record?.isApproved && <a onClick={() => {
              handleApprove(record._id)
            }}>Approve</a>
          }
        </Space >
      ),
    },
  ];

  let content = <Empty />
  if (isLoading) {
    content = <AdminTable columns={columns} data={currentData?.companies} isLoading={isLoading} tableTitle={"Companies Table"} />
  } else if (isSuccess) {
    content = <AdminTable columns={columns} data={currentData?.companies} tableTitle={"Companies Table"} />
  } else if (isError) {
    content = <>{error}</>
  }
  return (
    <>
      {content}
      <Modal
        width={600}
        title={"Company Profile"}
        open={isModalOpen}
        destroyOnClose
        closable={true}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        maskClosable={true}
        footer={
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {/* <Button onClick={handleUpdate} type="primary">Update</Button> */}
            </div>
          </>
        }
      >
        <CompanyProfile isModal={true} id={currentProfile?._id} />
      </Modal>
    </>
  )
}

export default CompanyTable