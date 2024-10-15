import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import './Banner.scss'

export const Banner = () => {
    return (
        <div className='banner'>
            <Row gutter={24}>
                <Col span={6}>
                    <Link to="/list-product/polo" className='banner-image'>
                        <img src="https://4menshop.com/images/thumbs/slides/slide-1-trang-chu-slide-1.png?t=1728066350" />
                    </Link>
                </Col>
                <Col span={12}>
                    <Link to="/new-arrivals" className='banner-image'>
                        <img src="https://4menshop.com/images/thumbs/slides/slide-2-trang-chu-slide-2.jpg" />
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/list-product/vest" className='banner-image'>
                        <img src="https://4menshop.com/images/thumbs/slides/slide-4-trang-chu-slide-3.png" />
                    </Link>
                </Col>
            </Row>
        </div>
    )
}
