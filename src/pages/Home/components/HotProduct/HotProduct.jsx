import './HotProduct.scss'
import { Row, Col } from 'antd'
import { Product } from '../Product/Product'
import { Container } from '../../../../components/Container/Container'
import { products } from '../../../../data/products'
export const HotProduct = () => {
    return (
        <div className='hotProduct'>
            <Container>
                <h2 className='hotProduct-title'>THỜI TRANG HOT NHẤT</h2>
                <Row justify={'space-between'}>
                    {products.map(product => (
                        <Col key={product.id} xs={12} sm={8} md={6} lg={4} xl={4}>
                            <Product {...product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
