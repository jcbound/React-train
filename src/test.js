import React, { Component } from 'react';
import { Divider, Table, message } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
let arr = []
let expandedRowsArr = []
class MyDraggableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedRowKeys: [],
      data: [
        {
          key: '1',
          name: 'John Brown sr.',
          age: '60',
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: '11',
              name: 'John Brown',
              age: '42',
              address: 'New York No. 2 Lake Park',
            },
            {
              key: '12',
              name: 'John Brown jr.',
              age: '30',
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  key: '121',
                  name: 'Jimmy Brown',
                  age: '16',
                  address: 'New York No. 3 Lake Park',
                },
              ],
            },
            {
              key: '13',
              name: 'Jim Green sr.',
              age: '72',
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: '131',
                  name: 'Jim Green',
                  age: '42',
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      key: '1311',
                      name: 'Jim Green jr.',
                      age: '25',
                      address: 'London No. 3 Lake Park',
                    },
                    {
                      key: '1312',
                      name: 'Jimmy Green sr.',
                      age: '18',
                      address: 'London No. 4 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: '2',
          name: 'Joe Black',
          age: '32',
          address: 'Sidney No. 1 Lake Park',
        },
        /* ... 你的初始数据 ... */
      ],
      // data:[
      //   {
      //     key: '1',
      //     name: '胡彦斌',
      //     age: 32,
      //     address: '西湖区湖底公园1号',
      //   },
      //   {
      //     key: '2',
      //     name: '胡彦祖',
      //     age: 42,
      //     address: '西湖区湖底公园1号',
      //   },
      // ]
    };
  }
  onExpandedRowsChange = (expandedRows) => {
    console.log(expandedRows, 'expandedRows')
    expandedRowsArr = JSON.parse(JSON.stringify(expandedRows))
  }
  
  onDragEnd = (result) => {
    console.log(result, 'result78979879879')

    if (!result.destination) return;
    const obj = this.findParentByKey(this.state.data, result.draggableId)
    const items = Array.from(this.state.data);
    console.log(obj, 'obj')
    // 说明是最外层拖拽
    let sourceIndex = null
    let destinationIndex = null
    let sourceObj = arr.find((item, index) => index === result.source.index)
    let destinationObj = arr.find((item, index) => index === result.destination.index)
    if (!obj) {
      this.state.data.forEach((item, index) => {
        if (item.key === sourceObj.key) {
          sourceIndex = index
        }
        if (item.key === destinationObj.key) {
          destinationIndex = index
        }
      })
      const [removed] = items.splice(sourceIndex, 1);
      console.log(removed, '123456789')
      items.splice(destinationIndex, 0, removed);
    } else {
      if (obj.children) {
        obj.children.forEach((item, index) => {
          if (item.key === sourceObj.key) {
            sourceIndex = index
          }
          if (item.key === destinationObj.key) {
            destinationIndex = index
          }
        })
        const [removed] = obj.children.splice(sourceIndex, 1);
        console.log(removed, '123456789')
        obj.children.splice(destinationIndex, 0, removed);
        function getItem(items) {
          for (let index = 0; index < items.length; index++) {
            if (items[index].key === obj.key) {
              items[index] = obj
              break
            }
            if (items[index].children) {
              getItem(items[index].children)
            }
          }
        }
      }

    }
    if (sourceIndex !== null && sourceIndex >= 0 && destinationIndex !== null && destinationIndex >= 0) {
      this.setState({
        data: items,
        expandedRowKeys: expandedRowsArr
      });
    } else {
      message.warning('只能进行同级排序')
      return
    }
    console.log(sourceIndex, destinationIndex, '46545646546')
    // this.state.data


    // const tasks = Array.from(initialData.tasks); // 复制任务数组
    // const [removed] = tasks.splice(result.source.index, 1); // 从源索引移除元素
    // tasks.splice(result.destination.index, 0, removed); // 在目标索引插入元素

    console.log(items, 'items')

  };
  onBeforeCapture=(result)=>{
    console.log(result, 'result79797979')
  }
  flattenTreeWithChildren(treeArray) {
    let result = [];

    function _flatten(node) {
      if (Array.isArray(node)) {
        node.forEach(_flatten);
      } else if (node !== null && typeof node === 'object') {
        result.push(node); // 假设每个节点都有一个value属性，根据实际情况调整
        if (node.children) {
          _flatten(node.children);
        }
      } else {
        result.push(node);
      }
    }

    _flatten(treeArray);
    return result;
  }
  findParentByKey(tree, targetKey, parent = null) {
    for (const node of tree) {
      // 检查当前节点是否有children属性
      if ('children' in node) {
        // 递归查找子树
        const foundInSubtree = this.findParentByKey(node.children, targetKey, node);
        if (foundInSubtree) {
          return foundInSubtree; // 如果在子树中找到了，直接返回找到的父级对象
        }
      }
      // 检查当前节点的key是否匹配目标key
      if (node.key === targetKey) {
        return parent; // 找到了目标key，返回其父级对象
      }
    }
    return null; // 遍历完所有节点都没找到，返回null
  }
  rowRender = (props,) => {
    console.log(props, 'props')
    arr = this.flattenTreeWithChildren(this.state.data)
    console.log(arr, 'arr')
    let currentIndex = arr.findIndex(item => item.key === props['data-row-key'])

    console.log(currentIndex, 'currentIndex')
    // const isSelected = selectedTaskIds.some(
    //   (selectedTaskId) => selectedTaskId === record.id
    // );
    // const isGhosting =
    //   isSelected && Boolean(draggingTaskId) && draggingTaskId !== record.id;
    // const style= props.style.height?props.style.height:{height:'50px'}
    return (
      <Draggable draggableId={props['data-row-key']}  key={props['data-row-key']} index={currentIndex}>
        {(provided, snapshot) => (
          <tr
            ref={provided.innerRef}
            {...props}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={props['data-row-key']}
            className={`row-item  
             ${snapshot.isDragging ? "row-dragging" : ""}`}
            style={{
              ...provided.draggableProps.style,
              // backgroundColor: snapshot.isDragging ? 'blue' : 'white',
              borderBottom:snapshot.isDragging ? '2px dashed #1890ff':'',
              borderTop:snapshot.isDragging ? '2px dashed #1890ff':'',
              display: snapshot.isDragging?'table':'',
              // height:'50px',
              // fontSize: ,
              ...props.style,
              // ...provided.style,
              // cursor: 'move',
            }}
          >
          </tr>
        )}
      </Draggable>
    );
  }

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      /* ... 你的列定义 ... */
    ];
    const components = {
      body: {
        row: ''
      },
    };
    return (
      <DragDropContext onDragEnd={this.onDragEnd}  onBeforeCapture={this.onBeforeCapture}>
        <Droppable droppableId="test">
          {(provided) => (
            // <div ref={provided.innerRef} {...provided.droppableProps}>
            <Table
              // expandedRowKeys={this.state.expandedRowKeys}
              onExpandedRowsChange={this.onExpandedRowsChange}
              columns={columns}
              defaultExpandAllRows={true}
              dataSource={this.state.data}
              rowKey='key'
              components={{
                body: {
                  wrapper: (props) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps} {...props} style={{ width: '100%' }}>
                      {/* {provided.placeholder}  */}
                    </tbody>


                    // <Droppable droppableId="droppable" {...props}>  
                    //   {(provided) => (  
                    //     <tbody ref={provided.innerRef} {...provided.droppableProps}  {...props}>  
                    //       {this.state.data.map(this.rowRender(...props))}  
                    //       {provided.placeholder}  
                    //     </tbody>  
                    //   )}  
                    // </Droppable>
                  ),
                  row: this.rowRender
                }
              }
              }
            // }}  
            />
            // {provided.placeholder}
            // </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default MyDraggableTable;