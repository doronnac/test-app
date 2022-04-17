import React from "react";
import { Modal, Form, Input, Button, Select, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { updateNote, deleteNote, createNote } from "../utils/note";
import './style.css'
import { createTemplate, deleteTemplate, updateTemplate } from "../utils/template";

function Note({ isOpened, closeModal, data, template, title }) {
    const { Option } = Select;
    const [form] = Form.useForm();
    React.useEffect(() => {
        form.resetFields()
        setNoteType(data.type || template.type || noteTypes[0].value)
        form.setFieldsValue({
            title: data.title || template.title || '',
            type: data.type || template.type || 'text',
            note: data.note?.text || template.note?.text || ''
        })
        // eslint-disable-next-line
    }, [data, template])
    const noteTypes = [
        { name: 'Text', value: 'text' },
        { name: 'To-do-list', value: 'toDoList' },
        { name: 'List', value: 'list' }
    ]
    const [noteType, setNoteType] = React.useState(data.type || template.type || noteTypes[0].value)
    const onFinish = async (values) => {
        if (title === "Create Template") {
            await createTemplate(values)
        }
        else if (title === "Update Template") {
            values.id = template.id
            await updateTemplate(values)
        }
        else if (data.note) {
            values.id = data.id
            await updateNote(values)
        }
        else {
            await createNote(values)
        }
        form.resetFields()
        closeModal()
    };

    const onFinishFailed = () => {
        closeModal()
    };

    const delNote = async () => {
        if (title === "Update Template") {
            await deleteTemplate(template.id)
        }
        else await deleteNote(data.id)
        closeModal()
    }

    return (
        <>
            <Modal title={title}
                footer={[
                    <Button key='delete' type="primary" danger onClick={() => delNote()} style={(title !== "Update Template" && !data.note) ? { 'visibility': 'hidden' } : null}>Delete</Button>,
                    <Button key="back" onClick={closeModal}>
                        Cancel
                    </Button>,
                    <Button type="primary" key="submit" htmlType='submit' onClick={form.submit}>Save</Button>
                ]}
                visible={isOpened} onCancel={closeModal}>
                <Form
                    form={form}
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 32 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                    >
                        <Input disabled={title !== "Update Template" && template.title} />
                    </Form.Item>

                    <Form.Item name='type' label="Type">
                        <Select style={{ width: 120 }} onChange={(value) => setNoteType(value)} disabled={title !== "Update Template" && (template.type || data.type)}>
                            {noteTypes.map((type) => {
                                return <Option value={type.value}>{type.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <h2>Note</h2>

                    {
                        noteType === 'text' ?
                            <>
                                <Form.Item name="note" >
                                    <Input.TextArea autoSize={true} />
                                </Form.Item>
                            </>
                            : noteType === 'toDoList' ?
                                <>
                                    <Form.List
                                            name="toDoList"
                                            initialValue={data?.note?.toDoList || template?.note?.toDoList}
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            required={false}
                                                            key={field.key}
                                                            style={{flexDirection: 'row'}}
                                                        >
                                                            <Form.Item
                                                                name={[field.name, 'checked']}
                                                                noStyle
                                                                valuePropName="checked"
                                                            >
                                                                <Checkbox  style={{marginRight: '2%'}}/>
                                                            </Form.Item>
                                                            <Form.Item
                                                                name={[field.name, 'item']}
                                                                noStyle
                                                            >
                                                                <Input style={fields.length > 1 ? { width: '85%' } : {width: '90%'}} />
                                                            </Form.Item>
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            style={{ width: '100%' }}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            Add field
                                                        </Button>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => {
                                                                add('The head item', 0);
                                                            }}
                                                            style={{ width: '100%', marginTop: '20px' }}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            Add field at head
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                </>
                                : noteType === 'list' ?
                                    <>
                                        <Form.List
                                            name="list"
                                            initialValue={data?.note?.list || template?.note?.list}
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            required={false}
                                                            key={field.key}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                noStyle
                                                            >
                                                                <Input style={fields.length > 1 ? { width: '90%' } : {width: '100%'}} />
                                                            </Form.Item>
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            style={{ width: '100%' }}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            Add field
                                                        </Button>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => {
                                                                add('The head item', 0);
                                                            }}
                                                            style={{ width: '100%', marginTop: '20px' }}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            Add field at head
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </>
                                    : <></>
                    }
                </Form>
            </Modal>
        </>
    );

}

export default Note;