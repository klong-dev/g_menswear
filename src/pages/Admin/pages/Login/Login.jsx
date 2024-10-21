import './Login.scss'
import { Container } from '../../../../components/Container/Container';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Flex } from 'antd';


export const AdminLogin = () => {


    return (
        <Flex align='center' className='admin-login' >
            <Container>
                <Flex vertical gap={8} className="admin-login-form" >
                    <h1 className='admin-login-title'>Quản Lý Đăng Nhập</h1>
                    <Input
                        placeholder="Enter your username"
                        prefix={
                            <UserOutlined
                                style={{
                                    color: 'rgba(0,0,0,.25)',
                                }}
                            />
                        }
                    />

                    <Input.Password
                        prefix={
                            <LockOutlined
                                style={{
                                    color: 'rgba(0,0,0,.25)',
                                }}
                            />
                        }
                        placeholder="Input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />

                    <Button type="primary">Đăng nhập</Button>
                </Flex>
            </Container>
        </Flex>
    )
}
