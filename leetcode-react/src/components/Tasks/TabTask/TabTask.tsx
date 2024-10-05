import React, { useState } from "react";
import "./TableTask.css";

const TabTask = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number,  className: string) =>
    toggleState === index ? className : "";

  const setClassNameForTab = (index: number) => {
    return `tabs ${getActiveClass(index, "active-tabs")}`;
  };
  
  const setClassNameForContent = (index: number) => {
    return `content ${getActiveClass(index, "active-content")}`;
  };

  return (
    <div className="container">
      <ul className="tab-list">
        <li className={setClassNameForTab(1)} onClick={() => toggleTab(1)}>
          Описание
        </li>
        <li className={setClassNameForTab(2)} onClick={() => toggleTab(2)}>
          Примеры
        </li>
        <li className={setClassNameForTab(3)} onClick={() => toggleTab(3)}>
          Результат решения
        </li>
      </ul>
      <div className="content-container">
        <div className={setClassNameForContent(1)}>
          <h2>Lorem</h2>
        </div>
        <div className={setClassNameForContent(2)}>
          <h2>Ipsum</h2>
        </div>
        <div className={setClassNameForContent(3)}>
          <h2>Dolor</h2>
        </div>
      </div>
    </div>
  );
};

export default TabTask;