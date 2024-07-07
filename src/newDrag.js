import React from 'react'
import { Table,Card,Form,message } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
// import  {DndProvider}  from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import './index.css';
let dragingIndex = -1;
 
 
class BodyRow extends React.Component {
    render() {
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        const style = { ...restProps.style, cursor: 'move' };
        let { className } = restProps;
        if (isOver) {
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }
        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}
    const rowSource = {
        beginDrag(props) {
            console.log("beginDrag",props)
            const dragingKey  = props["data-row-key"]
            dragingIndex = props.index;
            console.log(dragingKey)
            return {
                'data-row-key':dragingKey,
                index: props.index,
            }
            // dragingIndex = props.index;
            // return {
            //     index: props.index,
            // };
        },
    };
 
    const rowTarget = {
        drop(props, monitor) {
            const dragIndex = monitor.getItem().index;
            const hoverIndex = props.index;
            const dragKey = monitor.getItem()["data-row-key"];
            const hoverKey = props["data-row-key"];
            // Don't replace items with themselves
            if (dragKey === hoverKey) {
                return;
            }
            // Time to actually perform the action
            props.moveRow(dragIndex, hoverIndex,dragKey,hoverKey);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
            monitor.getItem()["data-row-key"] = hoverKey;
        },
    };
    const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        }))(
            DragSource('row', rowSource, connect => ({
            connectDragSource: connect.dragSource(),
        }))(BodyRow),
    );
 
 
 
 
 
 
 
// 权限管理 
 export default DragDropContext(HTML5Backend) (class Authority extends React.Component{
 
    state={
        data:[...data]
    }
 
    componentDidMount(){
    }
 
 
    components = {
        body: {
            row: DragableBodyRow,   
        },
    };
 
    
    
 
    moveRow = (dragIndex, hoverIndex,dragKey,hoverKey) => {
        const { data } = this.state;
        // const dragRow = data[dragIndex];
        console.log("index",dragIndex,hoverIndex)
        console.log("key",dragKey,hoverKey)
        const dragObject =  data.filter(ele=>ele.id === dragKey)[0]
        const hoverObject =  data.filter(ele=>ele.id === hoverKey)[0]
        console.log(dragObject,hoverObject,'132465')
        if(dragObject.pid === hoverObject.pid){   // 同级菜单的移动
            let  newData = data.filter(ele=>ele.id !== dragKey)
            let insertIndex = 0
            newData.forEach((ele,index)=>{
                if(ele.id === hoverKey){
                    if(dragIndex>hoverIndex){    // 上移：dragKey表示的元素   放到 hoverKey表示的元素之前
                        insertIndex = index;
                    }else{     // 下移  dragKey表示的元素 放到  hoverKey表示的元素之后
                        insertIndex = index +1;
                    }
                    
                }
            })
            newData.splice(insertIndex,0,dragObject)
            console.log(newData)
            this.setState({data:newData})
        }else{
            message.warning('只能进行同级排序')
            return
            let  newData = data.filter(ele=>ele.id !== dragKey)
            let insertIndex = 0
            newData.forEach((ele,index)=>{
                if(ele.id === hoverKey){
                    if(dragIndex>hoverIndex){    // 上移：dragKey表示的元素   放到 hoverKey表示的元素之前
                        insertIndex = index;
                    }else{     // 下移  dragKey表示的元素 放到  hoverKey表示的元素之后
                        insertIndex = index +1;
                    }
                    
                }
            })
            dragObject.pid = hoverObject.pid
            newData.splice(insertIndex,0,dragObject)
            this.setState({data:newData})
        }
    };
 
    render() {
        const {data}  = this.state
        console.log(toTree(data),'123456789465')
        return (
            <div className='drag-table'>
     
                {/* <DndProvider backend={HTML5Backend}> */}
                    <Table
                        rowKey="id"
                        columns={this.columns}
                        dataSource={toTree(data)}
                        components={this.components}
                        onRow={(record, index) => ({
                            index,
                            moveRow: this.moveRow,
                        })}
                    />
                {/* </DndProvider> */}
            </div>
           
        );
    }

    columns =[
        {
            title: 'ID',
            dataIndex: 'id',
        },
        // {
        //   title: '排序',
        //   dataIndex: 'sort',
        // },
        {
          title: '菜单名称',
          dataIndex: 'name',
        //   className: 'drag-visible',
        },
        {
          title: '路由',
          dataIndex: 'path',
        },
        {
          title: '真实路径',
          dataIndex: 'component',
        },
        {
            title: '图标',
            dataIndex: 'icon',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
      ];
})
 
const data = [
    {
        id:2,
        pid:0,
        orderNum:1,
        menuType:1,
        name:'父级菜单1',
        path:"/xxxxxxxxxxx",
        component:'./xxxxxxxxxxx',
        icon:'table',
        remark:'父级菜单1',
        status:0,
    },
    {
        id:3,
        pid:0,
        orderNum:2,
        menuType:1,
        name:'父级菜单2',
        path:"/xxxxxxxxxxx",
        component:'',
        icon:'crown',
        remark:'父级菜单2',
        status:0,
    },
    {
        id:42,
        pid:0,
        orderNum:41,
        menuType:1,
        name:'父级菜单3',
        path:"/xxxxxxxxxxx",
        component:'./xxxxxxxxxxx',
        icon:'table',
        remark:'',
        status:0,
    },
    {
        id:4,
        pid:3,
        orderNum:3,
        menuType:1,
        name:'2的子菜单1',
        path:"/xxxxxxxxxxx/xxxxxx",
        component:'./xxxxxxxxxxx/xxxxxx',
        icon:'',
        remark:'',
        status:0,
    },
    {
        id:11,
        pid:3,
        orderNum:10,
        menuType:1,
        name:'2的子菜单2',
        path:"/xxxxxxxxxxx/xxxxxx",
        component:'./xxxxxxxxxxx/xxxxxx',
        icon:'',
        remark:'',
        status:1,
    },
    {
        id:20,
        pid:3,
        orderNum:10,
        menuType:1,
        name:'2的子菜单3',
        path:"./xxxxxxxxxxx/xxxxxx",
        component:'./xxxxxxxxxxx/xxxxxx',
        icon:'',
        remark:'',
        status:1,
    },
    {
        id:50,
        pid:20,
        orderNum:10,
        menuType:1,
        name:'子菜单3的子菜单1',
        path:"/xxxxxxxxxxx/xxxxxx",
        component:'./xxxxxxxxxxx/xxxxxx',
        icon:'',
        remark:'',
        status:1,
    },
]
 
 
// 平铺列表转化成  树状数组结构
const toTree = (data) =>{
    let result = []
    if (!Array.isArray(data)) {
      return result
    }
    data.forEach(item => {
        delete item.children;
    });
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    data.forEach(item => {
      let parent = map[item.pid];
      if (parent) {
          (parent.children || (parent.children = [])).push(item);
      } else {
          result.push(item);
      }
    });
    return result;
}
// export default  DragDropContext(HTML5Backend)(Authority)