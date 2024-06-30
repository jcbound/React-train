// import "./styles.css";
import {
  Button,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Select,
  Tooltip
} from "antd";
import "antd/dist/antd.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { Component } from 'react';
const someData = [
  {
    id: "gary",
    sort: 1,
    name: "Gary Goodspeed",
    thumb: "/images/gary.png"
  },
  {
    id: "cato",
    sort: 0,
    name: "Little Cato",
    thumb: "/images/cato.png"
  },

  {
    id: "kvn",
    sort: 2,
    name: "KVN",
    thumb: "/images/kvn.png"
  },
  {
    id: "mooncake",
    sort: 3,
    name: "Mooncake",
    thumb: "/images/mooncake.png"
  },
  {
    id: "quinn",
    sort: 4,
    name: "Quinn Ergon",
    thumb: "/images/quinn.png"
  }
];
export default function ListApp() {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(someData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const Obj = [];

    console.log("obj", Obj);
  }
  return (
    <div className="App">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="DropId">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
            <List
              header={
                <div className="w-full m-0 p-0  ">
                  <p>Header</p>
                </div>
              }
              bordered
              rowKey="Id"
              dataSource={someData && someData}
              size="small"
              renderItem={(item, index) => (
                <Draggable draggableId="DropId" index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <List.Item>
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name+index}
                        </span>

                        {provided.placeholder}
                      </List.Item>
                    </div>
                  )}
                </Draggable>
              )}
            ></List>
               {/* {provided.placeholder} */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
