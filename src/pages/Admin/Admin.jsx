import { Flex, Input, Button, Upload, Row, Col, Form } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './Admin.scss'
import { AdminHeader } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'


const props = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    listType: 'picture',
    beforeUpload(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    ctx.fillStyle = 'red';
                    ctx.textBaseline = 'middle';
                    ctx.font = '33px Arial';
                    ctx.fillText('Ant Design', 20, 20);
                    canvas.toBlob((result) => resolve(result));
                };
            };
        });
    },
};

const validateMessages = {
    required: 'Vui lòng không bỏ trống',
    types: {
        price: 'Vui lòng nhập mệnh giá tiền hợp lệ',
        name: 'Vui long nhập một tên hợp lệ',
    },
};
const onFinish = (values) => {
    console.log(values);
};

export const Admin = () => {
    return (
        <div className="admin">
            <AdminHeader />
            <Hero />
            <Flex align='center' vertical className='admin-upload-form'>
                <h1>Thêm Sản Phẩm</h1>
                <Row className='custom-row'>
                    <Col flex={1} className='upload-image custom-col'>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Col>
                    <Col flex={3} className='product-information custom-col'>
                        <Form
                            name="nest-messages"
                            onFinish={onFinish}
                            style={{
                                minWidth: '100%',
                            }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name={['user', 'name']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên sản phẩm',
                                    },
                                ]}
                            >
                                <Input placeholder='Tên Sản Phẩm' />
                            </Form.Item>

                            <Form.Item
                                name={['user', 'price']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá sản phẩm',
                                    },
                                    {
                                        pattern: /^[0-9]+$/,
                                        message: 'Vui lòng nhập mệnh giá tiền hợp lệ',
                                    },
                                ]}
                            >
                                <Input placeholder='Giá sản phẩm' />
                            </Form.Item>

                            <Form.Item
                                name={['user', 'introduction']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả sản phẩm',
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder='Mô tả sản phẩm' />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>

                    </Col>
                </Row>
            </Flex>
        </div>
    )
}
