import { Flex, Row, Col, Button, Checkbox } from 'antd'
import './Category.scss'
import { Product } from '../../components/Product/Product'
import { Container } from '../../components/Container/Container'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { useState } from 'react'

export const Category = () => {
    const [productList, setProductList] = useState(products)
    const [categoryFilter, setCategoryFilter] = useState([])

    const handleFilter = (categoryId) => {
        if (categoryFilter.includes(categoryId)) {
            setCategoryFilter(categoryFilter.filter(id => id !== categoryId))
        } else {
            setCategoryFilter([...categoryFilter, categoryId])
        }
    }

    const filterProduct = () => {
        if (categoryFilter.length === 0) {
            setProductList(products)
        } else {
            const newProductList = products.filter(product => categoryFilter.includes(product.categoryId))
            setProductList(newProductList)
        }
    }

    const resetFilter = () => {
        setCategoryFilter([])
        setProductList(products)
        // uncheck all checkbox
        const checkboxes = document.querySelectorAll('.category__list-item-action')
        checkboxes.forEach(checkbox => checkbox.checked = false)
    }
    return (
        <div className='category'>
            <Container>
                <h1>Category</h1>
                <Flex justify='space-between' gap={24} className='category__content'>
                    <Flex vertical className='category__list'>
                        <div className='category__list-header'>
                            <h4>Bộ lọc sản phẩm</h4>
                        </div>
                        <div className='category__list-body'>
                            {categories.map(category => (
                                <div key={category.id} className='category__list-item'>
                                    <Checkbox className='category__list-item-action' onChange={() => handleFilter(category.id)}>{category.name}</Checkbox>
                                </div>
                            ))}
                        </div>
                        <div className='category__list-footer'>
                            <Button type='primary' onClick={filterProduct}>Áp dụng</Button>
                            <Button type='default' onClick={resetFilter}>Xóa bộ lọc</Button>
                        </div>
                    </Flex>
                    <Row gutter={8} className='category__product'>
                        {productList.map(product => (
                            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                                <Product {...product} />
                            </Col>
                        ))}
                        {productList.map(product => (
                            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                                <Product {...product} />
                            </Col>
                        ))}
                    </Row>
                </Flex>
            </Container>
        </div >
    )
}
