import { Button, Flex, Table } from 'antd'
import './ProductManage.scss'
import { Container } from '../../../../components/Container/Container'
import { products } from '../../../../data/products'
import { AddProduct } from '../AddProduct/AddProduct'

export const ProductManage = () => {
    return (
        <Flex className='product-manage'>
            <Container>
                <AddProduct />
                <Table
                    dataSource={products}
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
                            dataIndex: 'colors',
                            key: 'colors',
                            render: (colors) => (
                                <Flex wrap gap={8}>
                                    {colors.map((color) => (
                                        <div key={color.name} style={{ backgroundColor: color.value, width: 20, height: 20 }} />
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
            </Container>
        </Flex>
    )
}
