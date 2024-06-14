import { useState } from "react";
import { MinusIcon, PlusIcon } from "../../../../assets/icons";

const faqs = [
  {
    question: "What do I stand to gain by joining DOPE",
    answer: "You get to benefit lot of freebies, job placement etcetra",
  },
  {
    question: "What do I stand to gain by joining DOPE",
    answer: "You get to benefit lot of freebies, job placement etcetra",
  },
  {
    question: "What do I stand to gain by joining DOPE",
    answer: "You get to benefit lot of freebies, job placement etcetra",
  },
  {
    question: "What do I stand to gain by joining DOPE",
    answer: "You get to benefit lot of freebies, job placement etcetra",
  },
  {
    question: "What do I stand to gain by joining DOPE",
    answer: "You get to benefit lot of freebies, job placement etcetra",
  },
];

const Help = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="relative max-w-full border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)]">
      <div className="border-b py-6 ">
        <h2 className="mx-6 font-medium text-base lg:text-lg text-[#0e0e0e] font-gtwalsheimpro">
          Help
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-28 sm:grid-cols-2 p-6">
        <div>
          <div>
            <h2 className="text-base font-medium text-generalBlack">
              Frequently asked questions
            </h2>
            <p>Below are list of questions that are often asked</p>
          </div>
          <div className="divide-y-2 divide-[#E3E3E2]">
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="pt-6">
                  <>
                    <dt className="text-lg">
                      <button
                        className="ml-4 w-full flex justify-between items-start text-base font-medium text-generalBlack"
                        onClick={() => toggleFAQ(index)}
                      >
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          {openIndexes.includes(index) ? (
                            <MinusIcon />
                          ) : (
                            <PlusIcon />
                          )}
                        </span>
                      </button>
                    </dt>
                    {openIndexes.includes(index) && (
                      <dd className="mt-2">
                        <p className="text-base font-normal ml-4 text-[#5C5C5B]">
                          {faq.answer}
                        </p>
                      </dd>
                    )}
                  </>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-[#0D1B36]">
            Can’t Find Answer to Your Question?
          </h2>
          <p className="text-base font-normal text-[#5C5C5B]">
            Shoot us a message and we will revert in no time
          </p>
          <div className="mt-12">
            <label
              htmlFor="message"
              className="block text-base font-medium leading-6 text-generalBlack"
            >
              Your message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                required
                className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B] h-[166px]"
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className={`px-16 py-2.5 rounded-3xl text-base font-medium text-white focus:outline-none bg-[#16ceaa] shadow-[0_26px_46px_0_rgba(22,206,170,0.35)]`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
