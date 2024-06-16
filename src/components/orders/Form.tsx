import React, { useState } from "react";

const ItemInput = () => {
  const [items, setItems] = useState([{ name: "", price: "" }]);

  const addItem = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const removeItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  return (
    <div className="container">
      <form>
        {items.map((item, index) => (
          <div key={index} className="input-pair">
            <div>
              <label htmlFor={`name${index}`}>Item Name</label>
              <input
                type="text"
                id={`name${index}`}
                name="name"
                value={item.name}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label htmlFor={`price${index}`}>Price</label>
              <input
                type="number"
                id={`price${index}`}
                name="price"
                value={item.price}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter price"
              />
            </div>
            <button type="button" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))}
      </form>
      <button type="button" onClick={addItem}>
        Add Another Item
      </button>
    </div>
  );
};

export default ItemInput;
