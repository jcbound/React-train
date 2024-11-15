/*
 * @Author       : jcbound
 * @Date         : 2024-11-15 23:00:59
 * @LastEditors  : jcbound
 * @LastEditTime : 2024-11-15 23:51:06
 * @Description  : 我添加了修改
 * @FilePath     : \my-app\src\table\TestTable.js
 */
//使用antDesign table组件写个class组件
import React from 'react';
import { Table } from'antd';
import { Button } from 'antd';
// import './index.css';
class TestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ],
    };
  }
  componentDidMount() {
    console.log('132456798797')
    setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }
        ]
      })
    })
    this.getList().then(res=>{
      console.log(res,'123456789')
      this.setState({
        dataSource: res
    })
  })
  }
  //   this.setState({
  //     dataSource: [
  //       {
  //         key: '1',
  //         name: 'John Brown',
  //         age: 32,
  //         address: 'New York No. 1 Lake Park',
  //       },
  //       {
  //         key: '2',
  //         name: 'Jim Green',
  //         age: 42,
  //         address: 'London No. 1 Lake Park',
  //   }]
  // })
  // }
  getList=()=>{
    this.setState({
      loading: true
    })
    // http://jsonplaceholder.typicode.com/posts
    return fetch('http://jsonplaceholder.typicode.com/posts').then(res=>{
      // console.log(res.json(),'666666')
      this.setState({
        loading: false
      })
      return res.json()
    }
      )
  }
  handleClick = (record) => {
    console.log(record)
  }
  render() {
    const {columns}=this.props
    return (
      <div>
        <Table columns={columns} rowKey="id" dataSource={this.state.dataSource}  loading={this.state.loading}/>
      </div>
    );
  }
}
export default TestTable;