/*
 * @Author       : jcbound
 * @Date         : 2024-11-15 23:00:59
 * @LastEditors  : jcbound
 * @LastEditTime : 2024-11-15 23:52:49
 * @Description  : 我添加了修改
 * @FilePath     : \my-app\src\table\Tab.js
 */
//使用antDesign table组件写个class组件
import React from 'react';
import { Tabs } from 'antd';
import TestTable from './TestTable';
// import { Button } from 'antd';
import { Modal, Button } from 'antd';
const { TabPane } = Tabs;
// import './index.css';
class TabTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    };
  }
  callback = (key) => {
    console.log(key);
    this.setState({ activeKey: key });
  }
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        render: (text, record, index) => {
          return <div>{text}</div>
        }
        },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '40%'
        },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => {
          return <Button type="primary" onClick={() => this.handleClick(record)}>Click</Button>
        }
        },
     //  {
     //    title: 'Action',
     //    key: 'action',
     //    render: (text, record, index) => {
     //      return <Button type="primary" onClick={() => this.handleClick(record)}>Click</Button>
     //    }
     //    },
     //  {
     //    title: 'Action',
     //    key: 'action',
     //    render: (text, record, index) => {
     //      return <Button type="primary" onClick={() => this.handleClick(record)}>Click</Button>
     //    }
     //    },
     ]
    return (
      <div>
     <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
    <TabPane tab="Tab 1" key="1">
    <TestTable columns={columns}></TestTable>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
    <TestTable columns={columns}></TestTable>
    </TabPane>
    <TabPane tab="Tab 3" key="3">
    <TestTable columns={columns}></TestTable>
    </TabPane>
  </Tabs>,
      </div>
    );
  }
}
export default TabTest;



class ModalApp extends React.Component {
  state = { 
    visible: false,
    activeKey:'1',
    };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  callback = (key) => {
    console.log(key);
    this.setState({ activeKey: key });
  }
  render() {
    const { activeKey } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        render: (text, record, index) => {
          return <div>{text}</div>
        }
        },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '20%'
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: 300
        },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => {
          return <Button type="primary" onClick={() => this.handleClick(record)}>Click</Button>
        }
        },
     ]
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1200}
        >
          <Tabs defaultActiveKey="1" onChange={this.callback} animated={false} activeKey={activeKey}>
    <TabPane tab="Tab 1" key="1">
      {
        activeKey==='1'?<TestTable columns={columns}></TestTable>:null
      }
    {/* <TestTable columns={columns}></TestTable> */}
    </TabPane>
    <TabPane tab="Tab 2" key="2">
    {
        activeKey==='2'?<TestTable columns={columns}></TestTable>:null
      }
    </TabPane>
    <TabPane tab="Tab 3" key="3">
    {
        activeKey==='3'?<TestTable columns={columns}></TestTable>:null
      }
    </TabPane>
  </Tabs>,
        </Modal>
      </div>
    );
  }
}

export {ModalApp} ;