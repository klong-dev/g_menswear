import './ProductDetail.scss'
import { Carousel, Flex, Button, Select } from 'antd'
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
            <div className='product-detail__info'>
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

                <div className='product-detail__color'>
                    <p>Màu sắc: </p>
                    {product.colors.map(color => (
                        <div key={color.id} className='product-detail__color__item' style={{ backgroundColor: color.value }} ></div>
                    ))}
                </div>

                <Flex>
                    <Flex align='center' gap={8} className='product-detail__size'>
                        <span>Kích thước: </span>
                        <Select defaultValue={product.sizes[0]} style={{ width: 80, minWidth: 'fit-content' }}>
                            {product.sizes.map(size => (
                                <Select.Option key={size} value={size}>{size}</Select.Option>
                            ))}
                        </Select>
                    </Flex>

                    <Flex>

                    </Flex>
                </Flex>
                <Flex vertical gap={8}>
                    <Button type='primary' className='add_cart_btn'>Thêm vào giỏ hàng</Button>
                    <Button color='primary' variant='dashed' className='detail_btn'>Xem chi tiết</Button>
                </Flex>
            </div>
        </Flex>
    )
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired
}