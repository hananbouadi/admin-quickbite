import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = () => {
  const [list,setList] =useState([])

  const fetchdata = async () =>{
    const resp = await axios.get('http://localhost:5000/api/recipe/get')
    
    setList(resp.data)
   
  }

  useEffect(()=>{
    fetchdata()
  },[])

  const removeRecipe = async(id)=>{
     const response = await axios.delete(`http://localhost:5000/api/recipe/delete/${id}`)
     await fetchdata()
     if(response.data){
      toast.success(response.data.message)
     }else{
      toast.error("Error")
     }
  }

  return (
    <div className='list add flex-col'>
      <p>All Recipes List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>

        </div>
        {
          list.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                  <img src={`http://localhost:5000/getimage/${item.image}`} alt="" />
                  <p>{item.title}</p>
                  <p>{item.categorie}</p>
                  <p>{item.price}$</p>
                  <p onClick={()=>removeRecipe(item._id)} className='cursor'>X</p>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List