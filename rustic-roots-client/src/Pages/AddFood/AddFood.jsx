import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'; 
import useAuth from '../../hooks/useAuth'; 

const AddFood = () => {
  const { user } = useAuth(); 
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    
    const foodData = {
      ...data,
      addedByName: user.displayName || 'Guest',  
      addedByEmail: user.email || 'guest@example.com', 
    };

    try {
      const response = await fetch('https://rustic-roots-server.vercel.app/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Food item added successfully!',
        });

        
        reset();
      } else {
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add food item. Please try again.',
        });
      }
    } catch (error) {
      console.error(error);
     
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Add Food Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="text-white space-y-4">
        
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register('foodName', { required: 'Food name is required' })}
          />
          {errors.foodName && <span className="text-red-500">{errors.foodName.message}</span>}
        </div>

        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Image URL</span>
          </label>
          <input
            type="url"
            className="input input-bordered w-full"
            {...register('foodImage', { required: 'Food image URL is required' })}
          />
          {errors.foodImage && <span className="text-red-500">{errors.foodImage.message}</span>}
        </div>

        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Category</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register('foodCategory', { required: 'Food category is required' })}
          />
          {errors.foodCategory && <span className="text-red-500">{errors.foodCategory.message}</span>}
        </div>

        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register('quantity', { required: 'Quantity is required' })}
          />
          {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
        </div>

        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        </div>

        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Origin (Country)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register('foodOrigin', { required: 'Food origin is required' })}
          />
          {errors.foodOrigin && <span className="text-red-500">{errors.foodOrigin.message}</span>}
        </div>

        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        
        <div className="form-control">
          <button 
            type="submit" 
            className={`btn btn-primary w-full ${isLoading && 'loading'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
