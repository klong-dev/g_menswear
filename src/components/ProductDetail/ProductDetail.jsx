import './ProductDetail.scss'
import { Carousel, Flex, Button, Select, Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'

export const ProductDetail = ({ product }) => {
    console.log(product.name)
    return (
        <Flex className='product-detail' gap={24}>
            {product.salePercent > 0 &&
                <div className='product-detail__salePercent'>
                    <span>-{product.salePercent}%</span>
                </div>
            }
            {product.saleValue > 0 &&
                <div className='product-detail__saleValue'>
                    <span>-{product.saleValue.toLocaleString('vi-VN')} ₫</span>
                </div>
            }
            <Carousel arrows autoplay className='product-detail__carousel'>
                <div>
                    <img src={product.image} alt='product' />
                </div>
                <div>
                    <img src={product.image} alt='product' />
                </div>
                <div>
                    <img src={product.image} alt='product' />
                </div>
            </Carousel>
            <Row className='product-detail__info' gutter={24} style={{ flex: '1' }}>
                <Col lg={8} md={24} sm={24} xs={24}>
                    <h3 className='product-detail__name'>{product.name}</h3>
                    <span>Giá bán:</span>
                    <p className='product-detail__price'>
                        {(product.salePercent == 0 && product.saleValue == 0) && <span>{product.price.toLocaleString('vi-VN')} ₫</span>}
                        {(product.salePercent > 0 || product.saleValue > 0) &&
                            <>
                                {(product.price - (product.salePercent > 0 ? (product.price / 100 * product.salePercent) : (product.saleValue))).toLocaleString('vi-VN')} ₫
                                <span className='product-detail__price__sale'>
                                    {product.price.toLocaleString('vi-VN')} ₫
                                </span>
                            </>
                        }
                    </p>

                    <Flex wrap justify='start' className='product-detail__type__images'>
                        <p style={{ flexBasis: '100%' }}>Màu sắc: </p>
                        {product.type_images.map((type_image, index) => (
                            <div key={index} className='product__type__images__item'>
                                <img src={type_image.url} alt={type_image.name} style={{ borderRadius: 2, width: '100%', height: '100%' }} />
                            </div>
                        ))}
                    </Flex>

                    <Flex vertical>
                        <Flex align='center' gap={8} className='product-detail__size'>
                            <span>Kích thước: </span>
                            <Select defaultValue={product.sizes[0]} style={{ width: 80, minWidth: 'fit-content' }}>
                                {product.sizes.map(size => (
                                    <Select.Option key={size} value={size}>{size}</Select.Option>
                                ))}
                            </Select>
                        </Flex>

                        <Flex vertical gap={12}>
                            <Flex align='center' gap={8}>
                                <span>Kho: </span>
                                <span className='product-detail__stock'>{product.stock}</span>
                            </Flex>
                            <Flex align='center' gap={8}>
                                <span>Số lượng: </span>
                                <Input type='number' min={1} defaultValue={1} style={{ width: 80 }} />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex vertical gap={8} style={{ marginTop: 16 }}>
                        <Button type='primary' className='add_cart_btn'>Thêm vào giỏ hàng</Button>
                        <Button color='primary' variant='dashed' className='detail_btn'>Xem chi tiết</Button>
                    </Flex>
                </Col>
                <Col lg={16} md={24} sm={24} xs={24} style={{ paddingLeft: 24 }}>
                    <h3 className='product-detail__title'>Thông tin sản phẩm</h3>
                    <p className='product-detail__description'>{product.description}</p>
                </Col>
            </Row>
        </Flex>
    )
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired
}