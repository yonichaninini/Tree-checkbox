import React, { useState } from "react";
import CheckBoxGroup from "./component/CheckBoxGroup";
function App() {
  const nodes = [
    {
      value: "file",
      label: "File",
      children: [
        { value: "강아지", label: "강아지" },
        {
          value: "슈퍼맨",
          label: "슈퍼맨",
          children: [{ value: "주인공", label: "주인공" }]
        }
      ]
    }
  ];
  return (
    <div className="App">
      <CheckBoxGroup nodes={nodes} />
    </div>
  );
}

export default App;
