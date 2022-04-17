import React from 'react';
import 'antd/dist/antd.min.css';
import './index.css';
import { Menu, Switch, Divider, Spin, notification } from 'antd';
import {
  PlusSquareFilled,
  EditFilled
} from '@ant-design/icons';
import Note from '../Note';
import { getNotes } from '../utils/note';
import { getTemplates } from '../utils/template';

const { SubMenu } = Menu;

const Main = () => {
  const [mode, setMode] = React.useState('inline');
  const [isOpened, setIsOpened] = React.useState(false)
  const [notes, setNotes] = React.useState([])
  const [modalTitle, setModalTitle] = React.useState('')
  const [templates, setTemplates] = React.useState([])
  const [currentNote, setCurrentNote] = React.useState({})
  const [currentTemplate, setCurrentTemplate] = React.useState({})
  const changeMode = value => {
    setMode(value ? 'vertical' : 'inline');
  };

  const closeModal = () => {
    setIsOpened(false)
    setCurrentNote({})
    setCurrentTemplate({})
  }
  const loadData = async () => {
    try {
      const data = await getNotes()
      const templ = await getTemplates()
      setNotes(data)
      setTemplates(templ)
    }
    catch(e) {
      notification['error']({message: 'Server Error'});
    }
  }
  const openEditModal = (note) => {
    setModalTitle('Edit Note')
    setCurrentNote(note)
    setIsOpened(true)
  }
  const openTemplateNote = (template) => {
    setCurrentTemplate(template)
    setIsOpened(true)
  }

  React.useEffect(() => {
    loadData()
  }, [isOpened])

  return (
    <>
      <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <br />
      <br />
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
      >
        <SubMenu key="sub1" icon={<PlusSquareFilled />} title="Add page">
          {templates.map((template, index) => {
            return <Menu.Item onClick={() => {
              openTemplateNote(template); setModalTitle(`Create Note with Template: ${template.title}`)
            }} key={`template_${index}`}>{template.title || 'Unnamed'}</Menu.Item>
          })}
          <Menu.Item key="3" onClick={() => { setIsOpened(true); setModalTitle('Create New Note') }}>Empty page</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<PlusSquareFilled />} title="Templates">
          {templates.map((template, index) => {
            return <Menu.Item onClick={() => { openTemplateNote(template); setModalTitle('Update Template') }} key={`template_${index}`}>{template.title || 'Unnamed'}</Menu.Item>
          })}
          <Menu.Item key="6" onClick={() => { setIsOpened(true); setModalTitle('Create Template') }}>Add Template</Menu.Item>
        </SubMenu>
        {
          notes.map((note, index) => {
            return <Menu.Item key={`note_${index}`} onClick={() => openEditModal(note)} icon={<EditFilled />}>{note.title || 'Unnamed'}</Menu.Item>
          })
        }
      </Menu>
      <Note isOpened={isOpened} closeModal={closeModal} data={currentNote} template={currentTemplate} title={modalTitle} />
    </>
  );
};


export default Main