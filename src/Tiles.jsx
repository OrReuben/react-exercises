import { useRef, useState } from "react";

const Tiles = () => {
  const [tiles, setTiles] = useState(["A", "B", "C"]);
  const tileRef = useRef(null);

  const updateValues = (value, i) => {
    const newTiles = [...tiles];
    newTiles[i] = value;
    setTiles(newTiles);
  };

  const handleAddTile = (i) => {
    const newTiles = [...tiles];
    newTiles.splice(i + 1, 0, "");
    setTiles(newTiles);
    const inputRef = tileRef.current?.childNodes[i + 1].childNodes[0];
    inputRef?.focus();
  };

  return (
    <div className="tile-container">
      <h1 style={{textAlign:'center'}}>{tiles.join("")}</h1>

      <section className="tiles" ref={tileRef}>
        {tiles.map((tile, i) => (
          <div key={i} className="tile">
            <input
              type="text"
              value={tile}
              onChange={(e) => updateValues(e.currentTarget.value, i)}
            />{" "}
            {i < tiles.length - 1 && (
              <span onClick={() => handleAddTile(i)} className="add"></span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Tiles;