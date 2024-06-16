import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { InputField } from "../Input";

type ItemKeys = "item" | "total";

const ItemInput = () => {
  const [customerDetails, setCustomerDetails] = useState({
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    totalAmount: 0,
    itemOrdered: [{ item: "", total: "" }],
  });

  useEffect(() => {
    calculateTotalAmount();
  }, [customerDetails.itemOrdered]);

  const addItem = () => {
    setCustomerDetails({
      ...customerDetails,
      itemOrdered: [...customerDetails.itemOrdered, { item: "", total: "" }],
    });
  };

  const removeItem = (index: number) => {
    const values = [...customerDetails.itemOrdered];
    values.splice(index, 1);
    setCustomerDetails({
      ...customerDetails,
      itemOrdered: values,
    });
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...customerDetails.itemOrdered];
    values[index][event.target.name as ItemKeys] = event.target.value;
    setCustomerDetails({
      ...customerDetails,
      itemOrdered: values,
    });
  };

  const handleCustomerDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerDetails({
      ...customerDetails,
      [event.target.name]: event.target.value,
    });
  };

  const calculateTotalAmount = () => {
    const totalAmount = customerDetails.itemOrdered.reduce((sum, item) => {
      const price = parseFloat(item.total);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    setCustomerDetails((prevState) => ({
      ...prevState,
      totalAmount,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(customerDetails);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-8 border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)] mb-2 px-4 pt-2 pb-4">
          <div>
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
            >
              Customer Email
            </label>
            <InputField
              required
              id="customerEmail"
              name="customerEmail"
              type="email"
              placeholder="e.g example@gmail.com"
              classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
              onChange={handleCustomerDetailsChange}
            />
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
            >
              Customer Phone Number
            </label>
            <InputField
              required
              id="customerPhone"
              name="customerPhone"
              type="tel"
              placeholder="e.g 08013456789"
              classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
              onChange={handleCustomerDetailsChange}
            />
          </div>

          <div>
            <label
              htmlFor="customerAddress"
              className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
            >
              Customer Address
            </label>
            <InputField
              required
              id="customerAddress"
              name="customerAddress"
              type="text"
              placeholder="e.g Lagos, Nigeria"
              classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
              onChange={handleCustomerDetailsChange}
            />
          </div>
        </div>

        {customerDetails.itemOrdered.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-8 border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)] mb-2 px-4 pt-2 pb-4"
          >
            <div>
              <label htmlFor={`item${index}`}>Item Name</label>
              <input
                type="text"
                id={`item${index}`}
                name="item"
                value={item.item}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter item name"
                className="block w-full rounded-[12px] border py-3 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor={`total${index}`}>Price</label>
              <input
                type="number"
                id={`price${index}`}
                name="total"
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
