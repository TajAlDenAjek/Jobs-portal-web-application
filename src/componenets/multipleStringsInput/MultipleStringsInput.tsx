import React, { useState, useEffect } from 'react'
import { Input, Tag } from 'antd'

interface MultipleStringsInputProps {
    apiItems?: any
    setApiItems?: any
    placeholder?:any
    isViewMode?:boolean
}
const MultipleStringsInput: React.FC<MultipleStringsInputProps> = ({
    apiItems,
    setApiItems,
    placeholder,
    isViewMode=false
}) => {
    const [items, setItems] = useState<any>(apiItems);
    const [itemText, setItemText] = useState<any>('');

    const handleAddItem = () => {
        if (itemText.trim() !== '') {
            setItems([...items, itemText]);
            setItemText('');
        }
    };

    const handleDeleteItem = (item: any) => {
        const filteredItems = [...items].filter((i: any) => i !== item);
        setItems(filteredItems);
    };

    useEffect(() => {
        setApiItems(items);
    }, [items]);
    return <>
        {
            !isViewMode&&
            <Input
                placeholder={placeholder}
                value={itemText}
                onChange={(e: any) => setItemText(e.target.value)}
                onPressEnter={(e: any) => {
                    handleAddItem()
                }}
            />
        }
        {items.map((item: any): any => (
            <Tag
                key={item}
                closable={!isViewMode}
                onClose={() => handleDeleteItem(item)}
                style={{ margin: '4px' }}
            >
                {item}
            </Tag>
        ))}
    </>
}

export default MultipleStringsInput