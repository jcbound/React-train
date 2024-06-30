import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
// import { MenuOutlined } from '@ant-design/icons';
import { Table,Icon } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <Icon type="home" />
//   <MenuOutlined
//     style={{
//       cursor: 'grab',
//       color: '#999',
//     }}
  // />
));
const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
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
];
const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

const TestApp = () => {
  const [dataSource, setDataSource] = useState(data);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
        (el) => !!el,
      );
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
      expandable={{
        expandedRowRender: (record) => "11111",
        onExpandedRowsChange: (expandedRows) => {
          setExpandedRowKeys([...expandedRows]);
        },
        expandedRowKeys: expandedRowKeys,
      }}
    />
  );
};

export default TestApp;