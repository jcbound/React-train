/*
 * @Author       : jcbound
 * @Date         : 2024-06-30 13:35:01
 * @LastEditors  : jcbound
 * @LastEditTime : 2024-07-02 00:19:20
 * @Description  : 我添加了修改
 * @FilePath     : \my-app\src\dargTest.js
 */
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
  tasks: [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
    { id: 'task-3', content: 'Task 3' },
    // 更多任务...
  ],
};

function handleOnDragEnd(result, setTasks) {
  console.log(result, 'result')
  if (!result.destination) return; // 如果没有找到目标位置，则不进行任何操作

  const tasks = Array.from(initialData.tasks); // 复制任务数组
  const [removed] = tasks.splice(result.source.index, 1); // 从源索引移除元素
  tasks.splice(result.destination.index, 0, removed); // 在目标索引插入元素

  setTasks(tasks); // 更新任务状态
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: initialData.tasks,
    };
  }

  setTasks = (newTasks) => {
    this.setState({ tasks: newTasks });
  };
  renderEl = (provided, task) => {
    let arr= this.state.tasks
    console.log(arr,'4564679')
    // this.state.tasks.splice(0,0,1)
    return this.state.tasks.map((task, index) => {
      // console.log(task,index,)
      return (<Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}

            key={task.id}
          >
            {task.content}
          </li>
        )}
      </Draggable>
      )

    })

  }
  render() {
    return (
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, this.setTasks)}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul   ref={provided.innerRef} {...provided.droppableProps}>
                {this.renderEl()}
                {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default TaskList;

