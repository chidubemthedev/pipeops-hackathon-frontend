import React, { useState } from "react";
import { Button } from "../Button";

const ItemInput = () => {
  const [items, setItems] = useState([{ item: "", total: "" }]);

  const addItem = () => {
    setItems([...items, { item: "", total: "" }]);
  };

  const removeItem = (index: number) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleInputChange = (index: number, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(items);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-8 border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)] mb-2 px-4 pt-2 pb-4"
          >
            <div>
              <label htmlFor={`name${index}`}>Item Name</label>
              <input
                type="text"
                id={`name${index}`}
                name="name"
                value={item.item}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter item name"
                className="block w-full rounded-[12px] border py-3 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor={`price${index}`}>Price</label>
              <input
                type="number"
                id={`price${index}`}
                name="price"
                value={item.total}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter price (In Naira)"
                className="block w-full rounded-[12px] border py-3 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-end">
              <Button
                name="Remove"
                className="bg-red-500 max-w-[200px]"
                type="button"
                onClick={() => removeItem(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="flex gap-[20px] items-center justify-end mt-[50px]">
          <Button
            name="Add Another Item"
            type="button"
            className="max-w-[200px]"
            onClick={addItem}
          />
          <Button name="Create Order" className="max-w-[200px]" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ItemInput;
