import './HotProduct.scss'
import { Row, Col } from 'antd'
import { Product } from '../../../../components/Product/Product'
import { Container } from '../../../../components/Container/Container'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../../../../api/category'
export const HotProduct = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProductsData = async () => {
            const response = await fetchProducts()
            setProducts(response);
        }
        fetchProductsData()
    }, [])
    return (
        <div className='hotProduct'>
            <Container>
                <h2 className='hotProduct-title'>THỜI TRANG HOT NHẤT</h2>
                <Row gutter={8} justify={'space-evenly'}>
                    {products.map(product => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Product {...product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
