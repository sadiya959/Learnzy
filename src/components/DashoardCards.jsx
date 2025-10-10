import { BsBook, BsPerson } from "react-icons/bs";

const DashboardCard = () => {
  return (
    <div className="flex gap-5">
        <div
          className="bg-blue-100 flex shadow-lg shadow-blue-100  hover:shadow-xl gap-4 flex-col items-center  rounded-2xl p-4 mt-20 flex-1 text-center"
        >
          <BsBook size={20}/>
          <p className="text-4xl font-bold mt-2 text-blue-800 ">5</p>
          <h3 className="text-gray-500 text-sm">your courses</h3>
        </div>
        <div
          className="bg-purple-100 flex shadow-lg shadow-blue-100  hover:shadow-xl gap-4 flex-col items-center  rounded-2xl p-4 mt-20 flex-1 text-center"
        >
          <BsPerson size={20} />
          <p className="text-4xl font-bold mt-2 text-purple-800 ">15</p>
          <h3 className="text-gray-500 text-sm">Students</h3>
        </div>
        <div
          className="bg-green-100 flex shadow-lg shadow-blue-100  hover:shadow-xl gap-4 flex-col items-center  rounded-2xl p-4 mt-20 flex-1 text-center"
        >
          <BsBook size={20}/>
          <p className="text-4xl font-bold mt-2 text-green-800 ">5</p>
          <h3 className="text-gray-500 text-sm">your courses</h3>
        </div>
    </div>
  );
};

export default DashboardCard;
