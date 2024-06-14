import React, { useState } from 'react'

const SalesPath = ({ handleBack, handleSubmit, selectedTechnicalPath, setSelectedTechnicalPath, salesPath, technicalOptions1Array, chosenTrack }: any) => {
  const minTechnicalPaths = 1;
  const minSalesPaths = 1;

  const handleNextClick = () => {

    handleSubmit()

  }

  console.log(selectedTechnicalPath)
  return (
    <>

      <div>
        <h2 className="text-sm text-left font-medium mb-1 text-[#0e0e0e]">
          Sales Path{" "}
          <span className="text-sm text-[#5e5e5e] capitalize font-normal">
            (pick a minimum of 1 learning path)
          </span>
        </h2>
        <div className="flex flex-wrap">

          {salesPath.map((item: string, index: number) => {
            return (
              <div
                key={index}
                className="pr-4 mt-2"
              >
                <Path
                  key={index}
                  item={item}
                  selectedTechnicalPath={selectedTechnicalPath}
                  setSelectedTechnicalPath={setSelectedTechnicalPath}

                />
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm text-left font-medium mt-6 mb-1 text-[#0e0e0e]">
          Technical Path{" "}
          <span className="text-sm text-[#5e5e5e] capitalize font-normal">
            (pick a minimum of 1 learning paths)
          </span>
        </h2>
        <div className="flex flex-wrap">

          {technicalOptions1Array.map((item: string, index: number) => {
            return (
              <div
                key={index}
                className="pr-4 mt-2"
              >
                <Path
                  key={index}
                  item={item}
                  selectedTechnicalPath={selectedTechnicalPath}
                  setSelectedTechnicalPath={setSelectedTechnicalPath}
                />
              </div>
            )
          })}

        </div>
      </div>

      <div className="flex items-center mt-8 justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="font-gtwalsheimpro px-16 py-2.5 border border-[#16ceaa] rounded-3xl text-base font-medium text-[#16ceaa] w-[auto]"
        >
          Back
        </button>


        <button
          type="button"
          className={`font-gtwalsheimpro px-16 py-2.5 w-[auto] rounded-3xl text-base font-medium text-white focus:outline-none bg-[#16ceaa] shadow-[0_26px_46px_0_rgba(22,206,170,0.35)] 
    ${(selectedTechnicalPath.filter((path: string | string[]) => salesPath.includes(path)).length >= minSalesPaths &&
              selectedTechnicalPath.filter((path: string | string[]) => technicalOptions1Array.includes(path)).length >= minTechnicalPaths)
              ? ""
              : "opacity-40"
            }`}
          onClick={handleNextClick}
          disabled={
            (selectedTechnicalPath.filter((path: string | string[]) => salesPath.includes(path)).length < minSalesPaths) ||
            (selectedTechnicalPath.filter((path: string | string[]) => technicalOptions1Array.includes(path)).length < minTechnicalPaths)
          }
        >
          Submit
        </button>
      </div>


    </>
  );
}

export default SalesPath;

export const Path = ({ index, item, setSelectedTechnicalPath, selectedTechnicalPath }: any) => {
  const [active, setActive] = useState(false);

  const addItem = (item: any) => {
    if (selectedTechnicalPath.includes(item)) {
      const servicesList = selectedTechnicalPath.filter((e: any) => e !== item);
      setSelectedTechnicalPath(servicesList);
      setActive(false);

    } else {
      const serviceList = [
        ...selectedTechnicalPath,
        item
      ];
      setSelectedTechnicalPath(serviceList);
      setActive(true);
    }
  }

  return (
    <span
      onClick={() => addItem(item)}
      className={`inline-flex rounded-full items-center py-2.5 px-3 text-sm font-gtwalsheimpro border cursor-pointer
        ${active
          ? "text-primary border-primary"
          : "text-[#5e5e5e] border-[#e3e3e2]"}
      `}
      key={index}
    >
      {item}
      {!active ? (
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center"
        >
          <span className="sr-only">Select {item}</span>+
        </button>
      ) : (
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-8 rounded-full inline-flex items-center justify-center "
        >
          <span className="sr-only">Remove {item}</span>
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="16.6171"
              y1="17.5098"
              x2="5.30344"
              y2="6.1961"
              stroke="#16CEAA"
            />
            <line
              x1="17.3243"
              y1="6.1973"
              x2="6.01055"
              y2="17.511"
              stroke="#16CEAA"
            />
          </svg>
        </button>
      )}
    </span>
  );
}