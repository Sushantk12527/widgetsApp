import React, { useState } from "react";
import Accordion from "./accordion";
import Search from "./Search";
import Dropdown from "./dropdown";
import Translate from "./translate";
import Route from "./route";
import Header from "./header";

const items = [
  {
    title: "How did Goku Kill Frieza?",
    content: "Goku Killed Frieza using a Kamehameha attack.",
  },
  {
    title: "Who killed Cell?",

    content: "Gohan killed Cell.",
  },
  {
    title: "What is the name of god of death in Deathnote?",
    content: "The name of god of death in Deathnote is Shinigami",
  },
];

const options = [
  { label: " Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const onSelectedChange = (option) => {
    setSelected(option);
  };

  return (
    <div className="ui container">
      <Header />

      <Route path="/">
        <Accordion items={items} />
      </Route>

      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          options={options}
          onSelectedChange={onSelectedChange}
          selected={selected}
          label="Select Color"
        />
      </Route>

      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
export default App;
