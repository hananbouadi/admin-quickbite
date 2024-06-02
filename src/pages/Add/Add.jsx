import React, { useState } from 'react';
import './add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const url = 'http://localhost:5000';
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    price: '',
    categorie: 'salad'
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('categorie', data.categorie);

    try {
      const response = await axios.post(`${url}/api/recipe/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);

      // Reset form values
      setData({
        title: '',
        description: '',
        price: '',
        categorie: 'salad'
      });
      setImage(null);
      toast.success(response.data.message)
      document.getElementById('image').value = '';
    } catch (error) {
      console.error('There was an error submitting the data!', error);
      toast.error(response.data.message)
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.title} type="text" name='title' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="categorie" value={data.categorie}>
              <option value="appetizers">appetizers</option>
              <option value="maincours">maincours</option>
              <option value="deserts">deserts</option>
              <option value="salad">salad</option>
              <option value="sandwitch">sandwitch</option>
              <option value="drinks">drinks</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='20$' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
