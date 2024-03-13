import { useState } from "react";
import conceptOptionType from "../../../enum/post/conceptOptionType";

function NewPostTheme() {
  const [selected, setSelected] = useState<conceptOptionType | null>(null);

  const handleSelection = (option: conceptOptionType) => {
    setSelected(option);
    // Additional action on selection can be performed here
  };
  return (
    <div>
      <h1>Select Your Region</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {Object.entries(conceptOptionType).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleSelection(value as conceptOptionType)}
            style={{
              padding: "10px",
              backgroundColor: selected === value ? "#4CAF50" : "#f8f8f8",
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NewPostTheme;
