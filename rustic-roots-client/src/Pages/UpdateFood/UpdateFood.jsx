import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; 
import Swal from 'sweetalert2'; 

const UpdateFood = () => {
  const { user } = useAuth(); 
  const { foodId } = useParams(); 
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`https://rustic-roots-server.vercel.app/foods/${foodId}`); 
        const data = await response.json();

       
        if (data.addedByEmail !== user.email) {
          Swal.fire('Error', 'You can only update your own food items.', 'error');
          navigate('/myFoods'); 
        } else {
          setFood(data);
        }
      } catch (error) {
        console.error('Error fetching food:', error);
        Swal.fire('Error', 'Failed to fetch food details.', 'error').then(() => {
          navigate('/myFoods'); 
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user && foodId) {
      fetchFood();
    }
  }, [user, foodId, navigate]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const updatedFood = {
      foodName: e.target.foodName.value,
      foodImage: e.target.foodImage.value,
      foodCategory: e.target.foodCategory.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
      foodOrigin: e.target.foodOrigin.value,
      description: e.target.description.value,
    };
  
    console.log('Updated Food:', updatedFood);
  
    if (!updatedFood.foodName || !updatedFood.foodImage || !updatedFood.foodCategory || !updatedFood.foodOrigin || !updatedFood.description) {
      Swal.fire('Error', 'All fields are required.', 'error');
      setIsLoading(false);
      return;
    }
  
    if (updatedFood.price <= 0 || updatedFood.quantity <= 0) {
      Swal.fire('Error', 'Price and Quantity must be positive numbers.', 'error');
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`https://rustic-roots-server.vercel.app/foods/${foodId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFood),
      });
  
      if (response.ok) {
        Swal.fire('Success', 'Food item updated successfully!', 'success');
        navigate('/myFoods'); 
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.message || 'Failed to update food item.', 'error');
      }
    } catch (error) {
      console.error('Error updating food:', error);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Update Food Item</h2>

      {isLoading ? (
        <div className="text-center">Loading...</div> 
      ) : (
        food && (
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                name="foodName"
                defaultValue={food.foodName}
                className="input input-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Image URL</span>
              </label>
              <input
                type="url"
                name="foodImage"
                defaultValue={food.foodImage}
                className="input input-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

           
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Image Preview</span>
              </label>
              {food.foodImage && (
                <img src={food.foodImage} alt="Food" className="w-32 h-32 object-cover rounded" />
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Category</span>
              </label>
              <input
                type="text"
                name="foodCategory"
                defaultValue={food.foodCategory}
                className="input input-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={food.quantity}
                className="input input-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                defaultValue={food.price}
                step="0.01"
                className="input input-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Origin</span>
              </label>
              <input
                type="text"
                name="foodOrigin"
                defaultValue={food.foodOrigin}
                className="input input-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                defaultValue={food.description}
                className="textarea textarea-bordered w-full border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="form-control">
              <button type="submit" className={`btn btn-primary w-full ${isLoading && 'loading'}`} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Item'}
              </button>
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default UpdateFood;
