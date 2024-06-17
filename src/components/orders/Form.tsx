import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { InputField } from "../Input";
import { useAppDispatch } from "../../app/hooks";
import { generateOrder } from "../../features/orders/orderSlice";

type ItemKeys = "item" | "total";

const ItemInput = () => {
  const [customerDetails, setCustomerDetails] = useState({
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    paidDelivery: false,
    deliveryAmount: 0,
    totalAmount: 0,
    itemOrdered: [{ item: "", total: "" }],
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    calculateTotalAmount();
  }, [
    customerDetails.itemOrdered,
    customerDetails.deliveryAmount,
    customerDetails.paidDelivery,
  ]);

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
    const { name, value } = event.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: name === "deliveryAmount" ? parseFloat(value) : value,
    });
  };

  const calculateTotalAmount = () => {
    const totalItemAmount = customerDetails.itemOrdered.reduce((sum, item) => {
      const price = parseFloat(item.total);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    const totalAmount =
      totalItemAmount +
      (customerDetails.paidDelivery ? customerDetails.deliveryAmount : 0);
    setCustomerDetails((prevState) => ({
      ...prevState,
      totalAmount,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(customerDetails);
    // dispatch(generateOrder(customerDetails)).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-8 border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)] mb-2 px-4 pt-3 pb-4">
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
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-8 border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)] mb-2 px-4 pt-3 pb-4"
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

        <div className="flex gap-2 mt-[24px] items-center h-[52px]">
          <div
            onClick={() =>
              setCustomerDetails({
                ...customerDetails,
                paidDelivery: !customerDetails.paidDelivery,
              })
            }
            className={`
        ${customerDetails.paidDelivery ? "bg-primary" : "bg-[#78788029]"}
        relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
      `}
          >
            <span className="sr-only">Include Delivery Fee</span>
            <span
              aria-hidden="true"
              className={`
          ${customerDetails.paidDelivery ? "translate-x-5" : "translate-x-0"}
          pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
        `}
            />
          </div>
          <div>
            <p className="text-base font-[500] text-[#0E0E0E] text-nowrap">
              Include Delivery Fee
            </p>
          </div>

          {customerDetails.paidDelivery && (
            <InputField
              required={false}
              id="deliveryAmount"
              name="deliveryAmount"
              type="num"
              placeholder="e.g 2500"
              classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED] max-w-[200px]"
              onChange={handleCustomerDetailsChange}
            />
          )}
        </div>

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
