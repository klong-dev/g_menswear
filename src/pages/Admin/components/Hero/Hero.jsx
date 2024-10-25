import './Hero.scss'
import { Flex, Tabs } from 'antd'
import { Container } from '../../../../components/Container/Container'
import { AddProduct } from '../AddProduct/AddProduct'
import { ProductManage } from '../ProductManage/ProductManage'

export const Hero = () => {
    const items = [
        {
            key: '1',
            label: 'Quản lý sản phẩm',
            children: <ProductManage />,
        },
        {
            key: '2',
            label: 'Tab 2',
            children: <AddProduct />
        },
        {
            key: '3',
            label: 'Tab 3',
            children: 'Content of Tab Pane 3',
        }
    ];

    return (
        <Flex className='hero'>
            <Container>
                <Tabs defaultActiveKey="1" items={items} />
            </Container>
        </Flex>
    )
}
