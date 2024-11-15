import React, { Component } from 'react';
import { Divider, Table, message } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
let arr = []
let expandedRowsArr = []
let count = 0
class MyDraggableTable extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
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
  getIndex=(nodeId)=> {
    const firstNodeElement = this.props.arr[0];
    if (typeof firstNodeElement === 'object' && firstNodeElement !== null && 'props' in firstNodeElement) {
      if (nodeId === firstNodeElement.props.nodeId) {
        this.nodeIndexRef.current = 0;
        return 0;
      } else {
        return ++this.nodeIndexRef.current;
      }
    }
    return null; // 或者适当的错误处理
  }
  onExpandedRowsChange = (expandedRows) => {
    console.log(expandedRows, 'expandedRows')
    // expandedRowsArr = expandedRows
    // arr = this.flattenTreeWithChildren(this.state.data)
    //  JSON.parse(JSON.stringify(expandedRows))
    // this.setState({
    //   expandedRowsArr: expandedRows
    // })
  
  }
  onDragEnd = (result) => {

    console.log(result, 'result78979879879')
    console.log(this.myRef.current, 'current')
    // return
    // console.log(result, 'result')
    // if (!result.destination) return; // 如果没有找到目标位置，则不进行任何操作

    // const tasks = Array.from(this.state.data); // 复制任务数组
    // const [removed] = tasks.splice(result.source.index, 1); // 从源索引移除元素
    // tasks.splice(result.destination.index, 0, removed); // 在目标索引插入元素

    // // setTasks(tasks); // 更新任务状态
    // this.setState({
    //   data: tasks,
    // })
    // return
    if (!result.destination) return;
    const obj = this.findParentByKey(this.state.data, result.draggableId)
    const items = Array.from(this.state.data);
    console.log(obj, 'obj')
    // 说明是最外层拖拽
    let sourceIndex = null
    let destinationIndex = null
    let sourceObj = arr.find((item, index) => index === result.source.index)
    let destinationObj = arr.find((item, index) => index === result.destination.index)
    console.log(arr, 'arr123456789')
    console.log(obj, sourceObj, destinationObj, 'obj45678979')
    if (!obj) {
      this.state.data.forEach((item, index) => {
        if (item.key === sourceObj.key) {
          sourceIndex = index
        }
        if (item.key === destinationObj.key) {
          destinationIndex = index
        }
      })
      // const [removed] = items.splice(sourceIndex, 1);
      // console.log(removed, '123456789')
      // items.splice(destinationIndex, 0, removed);
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
        // const [removed] = obj.children.splice(sourceIndex, 1);
        // console.log(removed, '123456789')
        // obj.children.splice(destinationIndex, 0, removed);
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
    console.log(sourceIndex, destinationIndex, 'destinationIndex')
    if (sourceIndex !== null && sourceIndex >= 0 && destinationIndex !== null && destinationIndex >= 0) {
      console.log(expandedRowsArr, 'expandedRowsArr')
      // this.setState({
      //   data: items,
      //   // expandedRowKeys: expandedRowsArr
      // });
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
  onBeforeCapture = (result) => {
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
    count = count + 1
    // if(count>6){
    //   return 
    // }
    arr = this.flattenTreeWithChildren(this.state.data)
    console.log(arr, 'arr')
    let currentIndex = arr.findIndex(item => item.key === props['data-row-key'])
    // arr.splice(0, 0, 1)
    console.log(currentIndex, 'currentIndex')
    // const isSelected = selectedTaskIds.some(
    //   (selectedTaskId) => selectedTaskId === record.id
    // );
    // const isGhosting =
    //   isSelected && Boolean(draggingTaskId) && draggingTaskId !== record.id;
    // const style= props.style.height?props.style.height:{height:'50px'}
    return (
      <Draggable draggableId={props['data-row-key']} key={props['data-row-key']} index={currentIndex}>
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
              borderBottom: snapshot.isDragging ? '2px dashed #1890ff' : '',
              borderTop: snapshot.isDragging ? '2px dashed #1890ff' : '',
              display: snapshot.isDragging ? 'table' : '',
              // height:'50px',
              // fontSize: ,
              ...props.style,
              // ...provided.style,
              // cursor: 'move',
            }}
          >
            {/* {provided.placeholder} */}
          </tr>
        )}
      </Draggable>
    );
  }
   DroppableTableBody = ({ columnId, tasks, ...props }) => {
    console.log(columnId, 'columnId')
    return (
      <Droppable
        droppableId={columnId}
      // isDropDisabled={columnId === 'todo'}
      >
        {(provided, snapshot) => (
          <tbody
            ref={provided.innerRef}
            {...props}
            {...provided.droppableProps}
          // className={`${props.className} ${
          //   snapshot.isDraggingOver && columnId === COLUMN_ID_DONE
          //     ? "is-dragging-over"
          //     : ""
          // }`}
          ></tbody>
        )}
      </Droppable>
    );
  };
  /**
   * Draggable table row
   */
   DraggableTableRow = ({ index, record, columnId, tasks, ...props }) => {
    // return (
    //   <tr  {...props} index={index}/>
    // )
      const { children, label, nodeId } = props;
    console.log(index, props, '45646579')
    arr = this.flattenTreeWithChildren(this.state.data)
    console.log(arr, 'arr')
    // getIndex()
    // let currentIndex = arr.findIndex(item => item.key === props['data-row-key'])
    // arr.splice(0, 0, 1)
    // console.log(currentIndex, 'currentIndex')
    return (
      <Draggable
        key={props["data-row-key"]}
        draggableId={props["data-row-key"]}
        index={index}
        ref={this.myRef}
      >
        {(provided, snapshot) => {
          return (
            <tr
              ref={provided.innerRef}
              {...props}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              // index={currentIndex}
              style={{
                ...provided.draggableProps.style,
                // backgroundColor: snapshot.isDragging ? 'blue' : 'white',
                borderBottom: snapshot.isDragging ? '2px dashed #1890ff' : '',
                borderTop: snapshot.isDragging ? '2px dashed #1890ff' : '',
                display: snapshot.isDragging ? 'table' : '',
                // height:'50px',
                // fontSize: ,
                ...props.style,
                // ...provided.style,
                // cursor: 'move',
              }}
            // className={`row-item ${
            //   snapshot.isDragging ? "row-dragging" : ""
            // }`}
            // onClick={onClick}
            // onTouchEnd={onTouchEnd}
            // onKeyDown={event => onKeyDown(event, provided, snapshot)}
            ></tr>
          );
        }}
      </Draggable>
    );
  };
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, rowIndex) => rowIndex + 1, // 这里 rowIndex 是从0开始的，+1是为了人类友好的显示
      },
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
      // {
      //   title: '住址',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
      /* ... 你的列定义 ... */
    ];
    const components = {
      body: {
        row: ''
      },
    };
    /**
 * Droppable table body
 */
    console.log('执行次数')
    const getRowKey = (record, index) => {
      // console.log(record,index,'record')
      return record.key || index
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onBeforeCapture={this.onBeforeCapture}>
        {/* <Droppable droppableId="test">
          {(provided) => ( */}
        {/* // <div ref={provided.innerRef} {...provided.droppableProps}> */}
        <Table
          // expandedRowKeys={ this.state.expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange}
          columns={columns}
          // defaultExpandAllRows={true}
          // defaultExpandedRowKeys={ this.state.expandedRowKeys}
          dataSource={this.state.data}
          rowKey={(record, index) => (getRowKey(record, index))}
          onRow={(record, index) => ({
            index,
            record,
            // moveRow: this.moveRow,
            // onClick: (e) => onClickRow(e, record),
            // onTouchEnd: (e) => onTouchEndRow(e, record),
          })}
          components={{
            body: {
              // Custom tbody
              wrapper: (val) =>
                this.DroppableTableBody({
                  columnId: 'todo',
                  // tasks: getTasks(entities, id),
                  ...val,
                }),
              // Custom td
              row: (val) =>
                this.DraggableTableRow({
                  // tasks: getTasks(entities, id),
                  ...val,
                }),
            },
          }}
        // components={{
        //   body: {
        //     wrapper: (props) => (
        //       <tbody ref={provided.innerRef} {...provided.droppableProps} {...props} style={{ width: '100%' }}>
        //       </tbody>
        //     ),
        //     row: this.rowRender
        //   }
        // }
        // }
        />
        {/* // {provided.placeholder} */}

        {/* )}
        </Droppable> */}
      </DragDropContext>
    );
  }
}

export default MyDraggableTable;