import { useState } from 'react'
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
    message,
    ColorPicker
} from 'antd'
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { TextArea } = Input

export const AddProduct = () => {
    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [newCategory, setNewCategory] = useState('')

    const onFinish = (values) => {
        console.log('Success:', values)
        message.success('Product added successfully')
    }

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            const newId = (parseInt(categories[categories.length - 1].id) + 1).toString()
            setCategories(prev => [...prev, { id: newId, name: newCategory.trim() }])
            setNewCategory('')
            setIsModalVisible(false)
            form.setFieldsValue({ categoryId: newId })
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
            <Button type="primary" onClick={openModal}>Primary Button</Button>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={800}
            >
                <div className="max-w-4xl mx-auto p-6">
                    <Title level={2}>THÊM MỚI SẢN PHẨM</Title>
                    <Form
                        form={form}
                        name="productForm"
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            saleType: 'none',
                            sizes: ['M'],
                            colors: [{ name: 'Xanh dương' }]
                        }}
                    >
                        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Hình ảnh mô tả"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload name="image" listType="picture" maxCount={1}>
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

                        <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
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

                        <Form.Item name="stock" label="Kho" rules={[{ required: true }]}>
                            <InputNumber value={1} min={1} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.List name="sizes">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            required={false}
                                            key={index}
                                            label={index === 0 ? 'Kích thước' : ''}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[{ required: true, whitespace: true, message: "Vui lòng không bỏ trống." }]}
                                                noStyle
                                            >
                                                <Input style={{ width: '60%' }} placeholder="Size" />
                                            </Form.Item>
                                            {fields.length > 1 && (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            )}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Size
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.List name="type__images">
                            {(fields, { add, remove }) => (
                                <>
                                    <Text>Hình ảnh mô tả các loại: </Text>
                                    {fields.map((field, index) => (
                                        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={[{ required: true, message: 'Vui lòng điền đủ thông tin' }]}
                                            >
                                                <Input placeholder="Mô tả ( VD: Áo sơ mi AX01 - Đỏ )" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'color']}
                                                fieldKey={[field.fieldKey, 'color']}
                                                rules={[{ required: true, message: 'Vui lòng điền đủ thông tin' }]}
                                            >
                                                <Input placeholder='URL hình ảnh mô tả' />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm màu
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
                                Add Product
                            </Button>
                        </Form.Item>
                    </Form>

                    <Modal
                        title="Thêm danh mục mới"
                        visible={isModalVisible}
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
            </Modal>
        </>

    )
}