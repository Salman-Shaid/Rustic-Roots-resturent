import { Link } from "react-router-dom";

const HotFoodCard = ({ food }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <img src={food.foodImage} alt={food.foodName} className="w-full h-48 object-cover mb-4" />
        <h3 className="text-xl font-semibold">Name : {food.foodName}</h3>
        <p className="text-gray-500">Category : {food.foodCategory}</p>
        <p className="text-lg font-semibold">price: ${food.price}</p>
        <p className="text-sm text-gray-500">Total Quantity: {food.quantity}</p>
        
       
        <Link to={`/foods/${food._id}`}>
          <button className="bg-green-600 text-white py-2 px-4 rounded-full mt-4">
            Details
          </button>
        </Link>
      </div>
    );
  };
  
  export default HotFoodCard;
  