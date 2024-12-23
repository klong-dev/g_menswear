import './Product.scss'
import PropTypes from 'prop-types'
import { Button, Flex, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../ProductDetail/ProductDetail'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Product = (product) => {
    const [openModal, setOpenModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const notify = (type) => {
        switch (type) {
            case 'success':
                toast.success('Thêm vào giỏ hàng thành công', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            case 'error':
                toast.error('Thêm vào giỏ hàng thất bại', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            default:
                break;
        }
    }

    const showModal = () => {
        setOpenModal(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenModal(false);
            setConfirmLoading(false);
            notify('success');
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpenModal(false);
    };

    useEffect(() => {
        console.log(product)
    }, [])

    return (
        <Flex vertical justify='space-between' className='product'>
            <div className='product__overlay'></div>
            <Flex className='product__action' vertical>
                <Button className='add_cart_btn' onClick={showModal}>Thêm vào giỏ hàng</Button>
                <Button className='detail_btn' onClick={showModal}>Xem chi tiết</Button>
            </Flex>
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
            <Flex wrap className='product__type__images' justify='start'>
                {product.productTypes.map((type, index) => (
                    <div key={index} className='product__type__images__item'>
                        <img src={type.image} alt={type.name} />
                    </div>
                ))}
            </Flex>
            <div className='product__info'>
                <h3 className='product__name'>{product.name}</h3>
                <p className='product__price' style={{ marginTop: 5 }}>
                    {(product.salePercent == 0 && product.saleValue == 0) && <span>{product.price.toLocaleString('vi-VN')} ₫</span>}
                    {(product.salePercent > 0 || product.saleValue > 0) &&
                        <>
                            {(product.price - (product.salePercent > 0 ? (product.price / 100 * product.salePercent) : (product.saleValue))).toLocaleString('vi-VN')} ₫
                            <span className='product__price__sale'>
                                {product.price.toLocaleString('vi-VN')} ₫
                            </span>
                        </>
                    }
                </p>
            </div>
            <Modal
                title="Thông tin sản phẩm"
                open={openModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={992}

            >
                <ProductDetail product={product} />
            </Modal>
            <ToastContainer />
        </Flex >
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