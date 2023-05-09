import React, { useRef, useState } from "react";

const NewTiles = () => {
  const [tiles, setTiles] = useState(["A", "B", "C"]);
  const tileRef = useRef();

  const handleChangeInput = (value, i) => {
    const newTiles = [...tiles];
    newTiles[i] = value;
    setTiles(newTiles);
  };

  const handleAddTiles = (i) => {
    const newTiles = [...tiles];
    newTiles.splice(i + 1, 0, "");
    setTiles(newTiles);
    const inputRef = tileRef.current?.childNodes[i + 1].childNodes[0];
    inputRef?.focus();
  };

  return (
    <main className="tile-container">
      <center>
        {" "}
        <h1>{tiles.join("")}</h1>
      </center>
      <section className="tiles" ref={tileRef}>
        {tiles.map((item, i) => (
          <div key={i} className="tile">
            <input
              type="text"
              value={item}
              onChange={(e) => handleChangeInput(e.currentTarget.value, i)}
            />
            {i !== tiles.length - 1 && (
              <span onClick={() => handleAddTiles(i)} className="add"></span>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default NewTiles;
