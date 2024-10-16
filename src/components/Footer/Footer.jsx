import './Footer.scss'
import { Container } from '../Container/Container'
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Row, Col, Input } from 'antd'
import { Link } from 'react-router-dom'

const infoLinks = [
    { title: 'Giới thiệu', url: '#' },
    { title: 'Liên hệ', url: '#' },
    { title: 'Tuyển dụng', url: '#' },
    { title: 'Tin tức', url: '#' },
];

const supportLinks = [
    { title: 'Hướng dẫn đặt hàng', url: '#' },
    { title: 'Hướng dẫn chọn size', url: '#' },
    { title: 'Câu hỏi thường gặp', url: '#' },
    { title: 'Chính sách khách VIP', url: '#' },
    { title: 'Thanh toán - Giao hàng', url: '#' },
    { title: 'Chính sách đổi hàng', url: '#' },
    { title: 'Chính sách bảo mật', url: '#' },
    { title: 'Chính sách cookie', url: '#' },
];

export const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' }}>
            <Container>
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-logo">
                            <h2 style={{ color: '#fff' }}>4MEN</h2>
                        </div>
                        <ul>
                            {infoLinks.map((item, index) => (
                                <li key={index}><a href={item.url}>{item.title}</a></li>
                            ))}
                        </ul>
                        <p>
                            Email: info@4menshop.com<br />
                            Hotline: 0868.444.644
                        </p>
                        <Input.Search
                            placeholder="Email của bạn"
                            enterButton="Đăng ký"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <h3>Hỗ trợ khách hàng</h3>
                        <ul>
                            {supportLinks.map((item, index) => (
                                <li key={index}><Link to={item.url}>{item.title}</Link></li>
                            ))}
                        </ul>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <h3>Hệ thống cửa hàng</h3>
                        <img src="map-image-url" alt="Store Locations" style={{ width: '100%' }} />
                        <a href="#">Tìm địa chỉ cửa hàng gần bạn</a>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <h3>Kết nối với 4MEN</h3>
                        <div className="social-icons">
                            <FacebookOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#fff' }} />
                            <InstagramOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#fff' }} />
                            <YoutubeOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#fff' }} />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <a href="#">Facebook Page</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};