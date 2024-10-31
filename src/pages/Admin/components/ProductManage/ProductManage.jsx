import { Flex, Table } from 'antd'
import './ProductManage.scss'
import { products } from '../../../../data/products'
import { AddProduct } from '../AddProduct/AddProduct'

export const ProductManage = () => {
    return (
        <Flex className='product-manage' vertical>
            <AddProduct />
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
                        dataIndex: 'type_images',
                        key: 'type_images',
                        render: (type_images) => (
                            <Flex wrap gap={8} className='product-manage__type__images'>
                                {type_images.map((type, index) => (
                                    <div key={index} className='product-manage__type__images__item'>
                                        <img src={type.url} alt={type.name} style={{ borderRadius: 2, width: '100%', height: '100%' }} />
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
