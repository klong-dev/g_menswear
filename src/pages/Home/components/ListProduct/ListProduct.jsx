import './ListProduct.scss'
import { Row, Col, Flex, Button } from 'antd'
import { Product } from '../../../../components/Product/Product'
import { Container } from '../../../../components/Container/Container'
import { products } from '../../../../data/products'

export const ListProduct = () => {
    return (
        <div className='listProduct'>
            <Container>
                <h2 className='listProduct-title'>DANH SÁCH SẢN PHẨM</h2>
                <Row gutter={8}>
                    {products.map(product => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Product {...product} />
                        </Col>
                    ))}
                    {products.map(product => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Product {...product} />
                        </Col>
                    ))}
                </Row>
                <Flex justify='center'>
                    <Button className='listProduct-btn'>Xem tất cả sản phẩm</Button>
                </Flex>
            </Container>
        </div>
    )
}
