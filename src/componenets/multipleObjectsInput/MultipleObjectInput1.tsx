import React, { useState, useEffect } from 'react'
import { Form, Input, Tag, Button, Space } from 'antd'
import { validateDate, checkDate } from '../validation/validationRules'
import type { FormProps } from 'antd'


interface MultipleObjectsInputProps {
    apiItems?: any
    setApiItems?: any
    placeholder?: any
    form?: any,
    isViewMode?: boolean,
}

const MultipleOjectsInput1: React.FC<MultipleObjectsInputProps> = ({
    apiItems,
    setApiItems,
    placeholder,
    form,
    isViewMode = false
}) => {
    const [items, setItems] = useState<any>(apiItems);
    const [itemTitle, setItemTitle] = useState<string>('');
    const [itemStartDate, setItemStartDate] = useState<string>('');
    const [itemEndDate, setItemEndDate] = useState<string>('');

    const handleAddItem = () => {
        form.validateFields(["xx", "yy", "zz"])

        if (checkDate(itemStartDate) && checkDate(itemEndDate) && itemTitle.trim() !== '' && itemStartDate.trim() !== '' && itemEndDate.trim() !== '') {
            const newItem = {
                title: itemTitle,
                startDate: itemStartDate,
                endDate: itemEndDate
            };
            setItems([...items, newItem]);
            setItemTitle('');
            setItemStartDate('');
            setItemEndDate('');
            form.setFieldsValue({
                xx: '',
                yy: '',
                zz: '',
            });
        }
    };

    const handleDeleteItem = (item: any) => {
        const filteredItems = items.filter((i: any) => i !== item);
        setItems(filteredItems);
    };

    useEffect(() => {
        setApiItems(items);
    }, [items]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    !isViewMode &&


                    <Space direction="vertical">

                        <Form.Item
                            name="xx"
                            rules={[{ required: false, message: `please enter ${placeholder} field` }]}
                        >
                            <Input
                                placeholder="Title"
                                type='text'
                                value={itemTitle}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemTitle(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="yy"
                            rules={[{ validator: validateDate }]}
                        >
                            <Input
                                placeholder="Start Date"
                                value={itemStartDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemStartDate(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="zz"

                            rules={[{ validator: validateDate }]}
                        >

                            <Input
                                placeholder="End Date"
                                value={itemEndDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemEndDate(e.target.value)}
                            />

                        </Form.Item>

                        <Button type="primary" onClick={handleAddItem} >add {placeholder}</Button>
                    </Space>
                }
                {items.map((item: any): any => (
                    <Tag
                        key={item?.title}
                        closable={!isViewMode}
                        onClose={() => handleDeleteItem(item)}
                        style={{ margin: '4px' }}
                    >
                        <div>
                            <strong>{placeholder}:</strong> {item.title} |
                            <strong>Start Date:</strong> {item.startDate} |
                            <strong>End Date:</strong> {item.endDate}
                        </div>
                    </Tag>
                ))}
            </div>
        </>
    );
}

export default MultipleOjectsInput1;
