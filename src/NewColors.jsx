import React, { useState } from "react";

const NewColors = () => {
  const [dots, setDots] = useState([]);
  const [previousDots, setPreviousDots] = useState([]);
  const [currentColor, setCurrentColor] = useState("red");

  const handleClick = (e) => {
    const { clientX: left, clientY: top } = e;
    // Create dots according to the left and top attributes.
    setDots((prev) => [
      ...prev,
      { left: left - 125, top: top - 25, currentColor },
    ]);
  };

  const handleChangeColor = (color) => {
    // Make the function change a state.
    setCurrentColor(color);
  };

  const handleUndo = () => {
    // Make it so the last item gets removed from the list.
    const newDots = [...dots];
    const poppedDot = newDots.pop();
    setPreviousDots((prev) => [...prev, poppedDot]);
    setDots(newDots);
  };
  const handleRedo = () => {
    // Save the last removed item and incase the function executes add it back
    const newPreviousDots = [...previousDots];
    const poppedDot = newPreviousDots.pop();
    setDots((prev) => [...prev, poppedDot]);
    setPreviousDots(newPreviousDots);
  };
  
  const handleReset = () => {
    // Remove all the items from the array, and save them.
    const tempDots = [...dots];
    setDots([]);
    setPreviousDots((prev) => [...prev, ...tempDots]);
  };

  return (
    <main className="container">
      <section className="choose-color">
        {/* Create a color pallete */}
        {["red", "green", "blue", "yellow", "orange"].map((color, i) => (
          // Create an onclick event that changes between colors
          <div
            key={i}
            className="edot"
            style={{ backgroundColor: color }}
            onClick={() => handleChangeColor(color)}
          ></div>
        ))}
      </section>
      <section className="dot-wrapper" onClick={(e) => handleClick(e)}>
        {dots.map((item, i) => (
          <div
            className="dot"
            key={i}
            style={{
              left: item.left,
              top: item.top,
              backgroundColor: item.currentColor,
            }}
          ></div>
        ))}
      </section>
      <section className="actions">
        {/* Manage actions for buttons */}
        <button disabled={dots.length === 0} onClick={handleUndo}>
          Undo
        </button>
        <button disabled={previousDots.length === 0} onClick={handleRedo}>
          Redo
        </button>
        <button disabled={dots.length === 0} onClick={handleReset}>
          Reset
        </button>
      </section>
    </main>
  );
};

export default NewColors;
