import './Header.scss'
import { Container } from '../Container/Container'
import { Button, Drawer, Flex } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.jpg'

export const Header = () => {
    const [visible, setVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // Array for menu items
    const menuItems = [
        { label: 'DANH MỤC SẢN PHẨM', key: 'categories', url: '/category' },
        { label: 'ÁO POLO', key: 'shirts', url: '/category' },
        { label: 'BÁN CHẠY', key: 'new', className: 'hot', url: '/category' },
        { label: 'SET ĐỒ NAM', key: 'accessories', url: '/category' },
    ];

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div className={`header ${isScrolled && 'scrolled'}`}>
            <Container>
                <Flex className='header__content' align='center' justify='space-between'>
                    <div className="logo">
                        <Link to='/'><img src={logo} alt="" /></Link>
                    </div>

                    <Flex align='center'>
                        <div className="desktop-menu">
                            {menuItems.map((item) => (
                                <Link to={item.url}
                                    key={item.key}
                                    className={`menu-item ${item.className || ''}`}
                                    style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}
                                >
                                    {item.label} {item.className === 'hot' && <span className="hot-badge">Hot</span>}
                                </Link>
                            ))}
                        </div>

                        <Flex className="header-icons">
                            <Button type="text" icon={<SearchOutlined />} />
                            <Button type="text" icon={<ShoppingCartOutlined />} />
                        </Flex>
                    </Flex>

                    <Button
                        className="mobile-menu-button"
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={showDrawer}
                    />
                </Flex>



                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={onClose}
                    open={visible}
                >
                    {menuItems.map((item) => (
                        <Link to={item.url}
                            key={item.key}
                            className={`drawer-menu-item menu-item ${item.className || ''}`}
                            style={{ display: 'block', marginBottom: '20px', color: '#333' }}
                            onClick={onClose}
                        >
                            {item.label} {item.className === 'hot' && <span className="hot-badge">Hot</span>}
                        </Link>
                    ))}
                </Drawer>
            </Container>
        </div>
    );
};