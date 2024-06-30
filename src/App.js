/*
 * @Author       : jcbound
 * @Date         : 2024-06-30 13:00:47
 * @LastEditors  : jcbound
 * @LastEditTime : 2024-07-01 00:03:47
 * @Description  : 我添加了修改
 * @FilePath     : \my-app\src\App.js
 */
import logo from './logo.svg';
// import './App.css';
import MyDraggableTable from './test';
import TaskList from './dargTest';
import ListApp from './listTest';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React, { Component } from 'react';
import TestApp from './newDrag';
// import { MultiTableDrag } from "./newDrag";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MyDraggableTable></MyDraggableTable>
      {/* <ListApp></ListApp> */}
      <TaskList></TaskList>
      {/* <MultiTableDrag></MultiTableDrag> */}
      <TestApp></TestApp>
    </div>
  );
}

export default App;
