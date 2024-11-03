import { useEffect, useState } from 'react'
import {
    Form,
    Input,
    InputNumber,
    Button,
    Radio,
    Select,
    Upload,
    Modal,
    Space,
    Typography,
    message
} from 'antd'
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { TextArea } = Input

export const AddProduct = () => {
    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [newCategory, setNewCategory] = useState('')

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`)
            const data = await response.json()
            if (response.ok) {
                setCategories(data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const convertToBase64 = async (file) => {
        try {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            })
        } catch (error) {
            console.error('Error converting image to base64:', error)
        }
    }

    const onFinish = async (values) => {
        try {

            const formDataObject = async () => {
                return {
                    name: values.name,
                    price: values.price,
                    salePercent: values.salePercent || 0,
                    saleValue: values.saleValue || 0,
                    categoryId: values.categoryId,
                    stock: values.stock,
                    sizes: values.sizes,
                    description: !values.description ? "" : values.description,
                    image: values.image?.[0]?.originFileObj ? await convertToBase64(values.image[0].originFileObj) : null,
                    type_images: await Promise.all(values.type_images.map(async (item) => ({
                        name: item.name,
                        image: item.type_image ? await convertToBase64(item.type_image.file.originFileObj) : null
                    })))
                }
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(await formDataObject()),
            });

            const data = await response.json();

            if (response.ok) {
                message.success('Product added successfully');
                form.resetFields();
                setIsModalOpen(false);
            } else {
                message.error(data.message || 'Failed to add product');
            }
        } catch (error) {
            message.error('Network error');
            console.error('Error creating product:', error);
        }
    };

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategory.trim() }),
            });
            if (response.ok) {
                const data = await response.json()
                setCategories(prev => [...prev, { id: data.id, name: data.name }])
                setNewCategory('')
                setIsModalVisible(false)
                form.setFieldsValue({ categoryId: data.id })
                message.success('Category added successfully')
            } else {
                message.error('Failed to add category')
            }
        }
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => {
        setIsModalOpen(true)
    }

    // Mock data
    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products/categories')
    // })

    return (
        <>
            <Button type="primary" onClick={openModal} style={{ maxWidth: 200, marginBottom: 20 }}>Thêm sản phẩm</Button>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={800}
                style={{ top: 20 }}
            >
                <div style={{ maxHeight: 'calc(90vh - 20px)', overflowY: 'auto', paddingRight: 15 }}>
                    <Title level={2}>THÊM MỚI SẢN PHẨM</Title>
                    <Form
                        form={form}
                        name="productForm"
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            saleType: 'none',
                            sizes: [],
                            type_images: []
                        }}
                    >
                        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Nhập tên sản phẩm' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Nhập giá sản phẩm' }]}>
                            <InputNumber type='number' min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Hình ảnh mô tả"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload name="image"
                                listType="picture"
                                maxCount={1}
                                accept=".jpg,.jpeg,.png,.gif"
                            >
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name="saleType" label="Giảm giá">
                            <Radio.Group>
                                <Radio value="none">Không</Radio>
                                <Radio value="percent">Giảm theo %</Radio>
                                <Radio value="value">Giảm theo giá trị</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.saleType !== currentValues.saleType}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('saleType') === 'percent' ? (
                                    <Form.Item name="salePercent" label="Giảm theo %">
                                        <InputNumber
                                            prefix={<span style={{ color: 'gray' }}>%</span>}
                                            min={1} max={100} style={{ width: '100%' }} />
                                    </Form.Item>
                                ) : getFieldValue('saleType') === 'none' ? (
                                    <></>
                                ) :
                                    <Form.Item name="saleValue" label="Giảm theo giá trị">
                                        <InputNumber
                                            prefix={<span style={{ color: 'gray' }}>đ</span>}
                                            min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                            }
                        </Form.Item>

                        <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: 'Chọn 1 hoặc tạo danh mục mới' }]}>
                            <Select
                                style={{ width: '100%' }}
                                dropdownRender={menu => (
                                    <>
                                        {menu}
                                        <div style={{ padding: '8px', borderTop: '1px solid #e8e8e8' }}>
                                            <Button type="link" onClick={() => setIsModalVisible(true)}>
                                                <PlusOutlined /> Add Category
                                            </Button>
                                        </div>
                                    </>
                                )}
                            >
                                {categories.map((category, index) => (
                                    <Select.Option key={index} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="stock" label="Kho" rules={[{ required: true, message: "Vui lòng đặt số lượng kho" }]}>
                            <InputNumber type='number' initialvalues={1} min={1} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.List name="sizes">
                            {(fields, { add, remove }) => (
                                <>
                                    <Text>Thêm kích thước sản phẩm: </Text>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            required={false}
                                            key={index}
                                        >
                                            {(() => { // tạo 1 function để trả về 1 component
                                                const { key, ...rest } = field;
                                                return (
                                                    <Form.Item
                                                        {...rest}
                                                        rules={[{ required: true, whitespace: true, message: "Vui lòng không bỏ trống." }]}
                                                        noStyle
                                                    >
                                                        <Input style={{ width: '60%' }} placeholder="Kích thước ( VD: XL )" />
                                                    </Form.Item>
                                                );
                                            })()}
                                            {
                                                fields.length > 1 && (
                                                    <MinusCircleOutlined style={{ marginLeft: 10 }}
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                )
                                            }
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.List name="type_images">
                            {(fields, { add, remove }) => (
                                <>
                                    <Text>Hình ảnh mô tả các loại: </Text>
                                    {fields.map((field, index) => (
                                        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            {(() => {
                                                const { key, ...rest } = field;
                                                return (
                                                    <Form.Item
                                                        {...rest}
                                                        name={[field.name, 'name']}
                                                        rules={[{ required: true, message: 'Vui lòng điền đủ thông tin' }]}
                                                    >
                                                        <Input placeholder="Mô tả ( VD: Áo sơ mi AX01 - Đỏ )" style={{ width: 252, maxWidth: '100%' }} />
                                                    </Form.Item>
                                                )
                                            })()}
                                            {(() => {
                                                const { key, value, ...rest } = field;
                                                return (
                                                    <Form.Item
                                                        {...rest}
                                                        name={[field.name, 'type_image']}
                                                        rules={[{ required: true, message: 'Vui lòng điền đủ thông tin' }]}
                                                    >
                                                        <Upload
                                                            name="image"
                                                            listType="picture"
                                                            maxCount={1}
                                                            accept=".jpg,.jpeg,.png,.gif">
                                                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                                                        </Upload>
                                                    </Form.Item>
                                                )
                                            })()}
                                            <MinusCircleOutlined style={{ marginLeft: 5 }} onClick={() => remove(field.name)} />

                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm hình ảnh
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item name="description" label="Description">
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Thêm sản phẩm
                            </Button>
                        </Form.Item>
                    </Form>

                    <Modal
                        title="Thêm danh mục mới"
                        open={isModalVisible}
                        onOk={handleAddCategory}
                        onCancel={() => setIsModalVisible(false)}
                    >
                        <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Tên danh mục mới"
                        />
                    </Modal>
                </div>
            </Modal >
        </>

    )
}