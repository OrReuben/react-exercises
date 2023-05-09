import React, { useState } from "react";

const Colors = () => {
  const [dots, setDots] = useState([]);
  const [previousDots, setPreviousDots] = useState([]);
  const [currentColor, setCurrentColor] = useState("red");
  const [activeColor, setActiveColor] = useState(null); 

  const handleAddCircle = (e) => {
    const left = e.clientX - 125;
    const top = e.clientY - 25;
    setDots((prev) => [...prev, { left, top, currentColor }]);
  };

  const handleChangeColor = (color, i) => {
    setActiveColor(i);
    setCurrentColor(color);
  };

  const handleUndo = () => {
    if (dots.length > 0) {
      const poppedDot = dots.pop();
      setPreviousDots((prev) => [...prev, poppedDot]);
    }
  };

  const handleRedo = () => {
    if(previousDots.length > 0){
      const poppedPreviousDot = previousDots.pop();
      setDots((prev) => [...prev, poppedPreviousDot]);
    }
  };

  const clearDots = () => {
    if (dots.length > 0) {
      setPreviousDots((prev) => [...prev, ...dots]);
      setDots([])
    }
  }
  
  return (
    <main className="container">
      <section className="choose-color">
        {/* Whenever we click on the color, change the color */}
        {["red", "blue", "green", "purple", "yellow"].map((color, i) => (
          <div
            key={i}
            className="edot"
            style={{
              backgroundColor: color,
              border: i === activeColor && "2px solid black",
            }}
            onClick={() => handleChangeColor(color, i)}
          ></div>
        ))}
      </section>
      <section className="dot-wrapper" onClick={handleAddCircle}>
        {dots.map((circle, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${circle.left}px`,
              top: `${circle.top}px`,
              backgroundColor: circle.currentColor,
            }}
          ></div>
        ))}
      </section>
      <section className="actions">
        <button disabled={dots.length === 0} onClick={handleUndo}>Undo</button>
        <button disabled={previousDots.length === 0} onClick={handleRedo}>Redo</button>
        <button disabled={dots.length === 0} onClick={clearDots}>Clear</button>
      </section>
    </main>
  );
};

export default Colors;
