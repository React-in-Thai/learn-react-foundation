function getProductStock(color, size) {
  const mapping = {
    "red-small": 1,
    "red-medium": 0,
    "red-large": 12,
    "blue-small": 7,
    "blue-medium": 3,
    "blue-large": 0,
    "green-small": 0,
    "green-medium": 9,
    "green-large": 0,
  };
  return mapping[`${color}-${size}`] || 0;
}

function App() {
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const colors = ["red", "blue", "green"];
  const sizes = ["small", "medium", "large"];
  const quantity = getProductStock(selectedColor, selectedSize);
  return (
    <div style={{ maxWidth: 343, margin: "auto" }}>
      <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Color</p>

      {colors.map((color) => (
        <React.Fragment>
          <input
            type="radio"
            id={`color-${color}`}
            name="color"
            checked={selectedColor === color}
            value={color}
            onChange={(event) => setSelectedColor(event.target.value)}
          />
          <label htmlFor={`color-${color}`} style={{ marginLeft: "0.5rem" }}>
            {color.substring(0, 1).toUpperCase()}
            {color.substring(1)}
          </label>
          <br />
        </React.Fragment>
      ))}

      <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Size</p>

      {sizes.map((size) => (
        <React.Fragment>
          <input
            type="radio"
            id={`size-${size}`}
            name="size"
            checked={selectedSize === size}
            value={size}
            onChange={(event) => setSelectedSize(event.target.value)}
          />
          <label htmlFor={`size-${size}`} style={{ marginLeft: "0.5rem" }}>
            {size.substring(0, 1).toUpperCase()}
            {size.substring(1)}
          </label>
          <br />
        </React.Fragment>
      ))}

      <br />

      <button disabled={!selectedSize || !setSelectedColor || !quantity}>
        Add to cart
      </button>
      {selectedSize && selectedColor && !quantity && (
        <p style={{ color: "red", fontSize: "0.75rem" }}>สินค้าหมด</p>
      )}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
