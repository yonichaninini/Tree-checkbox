import React, { useState } from "react";
import CheckBoxGroup from "./component/CheckBoxGroup";
function App() {
  const [checkList, setCheckList] = useState([]);
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
        },
        {
          value: "멍뭉이",
          label: "멍뭉이",
          children: [{ value: "아기", label: "아기" }]
        }
      ]
    }
  ];
  return (
    <div className="App">
      <CheckBoxGroup nodes={nodes} checkList={checkList} />
    </div>
  );
}

export default App;
