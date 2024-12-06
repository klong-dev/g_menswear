import { Flex, Table } from 'antd'
import './ProductManage.scss'
import { AddProduct } from '../AddProduct/AddProduct'
import { useEffect, useState } from 'react'

export const ProductManage = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
            const data = await response.json()
            if (response.ok) {
                console.log('Products:', data)
                setProducts(data)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Flex className='product-manage' vertical>
            <AddProduct onProductAdded={fetchProducts} />
            <Table
                dataSource={products}
                scroll={{ x: 'max-content' }}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Tên sản phẩm',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Giá',
                        dataIndex: 'price',
                        key: 'price',
                        render: (price) => <span>{price.toLocaleString()} đ</span>,
                    },
                    {
                        title: 'Kho',
                        dataIndex: 'stock',
                        key: 'stock',
                    },
                    {
                        title: 'Loại',
                        dataIndex: 'type',
                        key: 'type',
                    },
                    {
                        title: 'Hình ảnh',
                        dataIndex: 'image',
                        key: 'image',
                        render: (image) => <img src={image} alt='product' style={{ width: 80 }} />,
                    },
                    {
                        title: 'Màu sắc',
                        dataIndex: 'productTypes',
                        key: 'productTypes',
                        render: (productTypes) => (
                            <Flex wrap gap={8} className='product-manage__type__images'>
                                {productTypes.map((type, index) => (
                                    <div key={index} className='product-manage__type__images__item'>
                                        <img src={type.image} alt={type.name} style={{ borderRadius: 2, width: '100%', height: '100%' }} />
                                    </div>
                                ))}
                            </Flex>
                        ),
                    },
                    {
                        title: 'Mô tả sản phẩm',
                        dataIndex: 'description',
                        key: 'description',
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: () => <a href='#'>Edit</a>,
                    }
                ]}
            />
        </Flex>
    )
}
