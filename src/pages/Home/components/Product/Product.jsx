import './Product.scss'
import PropTypes from 'prop-types'

export const Product = (product) => {
    return (
        <div className='product'>
            {product.salePercent > 0 &&
                <div className='product__salePercent'>
                    <span>-{product.salePercent}%</span>
                </div>
            }
            {product.saleValue > 0 &&
                <div className='product__saleValue'>
                    <span>-{product.saleValue.toLocaleString('vi-VN')} ₫</span>
                </div>
            }
            <div className='product__image'>
                <img src={product.image} alt={product.name} />
            </div>
            <div className='product__color'>
                <div className='product__color__item'></div>
                <div className='product__color__item'></div>
            </div>
            <div className='product__info'>
                <h3 className='product__name'>{product.name}</h3>
                <p className='product__price'>
                    {(product.salePercent == 0 && product.saleValue == 0) && <span>{product.price.toLocaleString('vi-VN')} ₫</span>}
                    {(product.salePercent > 0 || product.saleValue > 0) &&
                        <>
                            {product.price.toLocaleString('vi-VN')} ₫
                            <span className='product__price__sale'>
                                {product.price.toLocaleString('vi-VN')} ₫
                            </span>
                        </>
                    }

                </p>
            </div>
        </div >
    )
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        salePercent: PropTypes.number.isRequired,
        saleValue: PropTypes.number.isRequired,
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired
}