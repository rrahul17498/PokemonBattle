


const Spinner = ({ message = "Loading..." }) => {

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <svg className="animate-spin" width="60px" height="60px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx='50' cy='50' r='45' fill='white' strokeWidth='4' stroke='#6b7280'></circle> 
                <circle cx='50' cy='50' r='15' strokeWidth='4' stroke='#6b7280' fill='white'></circle>
                <line x1='3' y1='50' x2='35' y2='50' strokeWidth='4' stroke='#6b7280'></line>
                <line x1='65' y1='50' x2='97' y2='50' strokeWidth='4' stroke='#6b7280'></line>
            </svg>
            <h4 className="text-gray-500 font-semibold mt-2">{message}</h4>
        </div>
    )

};

export default Spinner;