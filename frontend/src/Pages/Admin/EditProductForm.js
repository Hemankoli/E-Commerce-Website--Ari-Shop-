import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import productsCategory from './productsCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import UploadImage from './UploadImage';
import ViewImage from './ViewImage';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';


const EditProductForm = ({onClose, productData, fetchData}) => {

    const [data, setData] = useState({
        productName: productData?.productName,
        brandName: productData?.brandName,
        description: productData?.description,
        image: productData?.image ||  [],  
        price: productData?.price,
        selling: productData?.selling,
        category: productData?.category,
        quantity: productData?.quantity,
        product_id: productData?.product_id
    });
    console.log(data)
    
    const [openImage, setOpenImage] = useState(false);
    const [showImage, setShowImage] = useState("");
    
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        console.log("File", file);
    
        const uploadImageCloudinary = await UploadImage(file);
    
        setData((prev) => ({
          ...prev,
          image: [...prev.image, uploadImageCloudinary.url]
        }));
    };
    
    const handleDeleteImage = async (index) => {
        const newProductImage = [...data.image];
        newProductImage.splice(index, 1);
    
        setData((prev) => ({
          ...prev,
          image: [...newProductImage]
        }));
    };
    
    // Submission 
    const handleSubmit = async (e) => {
      if(!data?.product_id){
        console.log("product id missing");
        return
      }
        e.preventDefault();
        const response = await axios.put(`http://localhost:8000/update-product/${data?.product_id}`, data);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          onClose();
          fetchData();
        } else {
          toast.error(response?.data?.message);
        }
    };

return (
    <div className='fixed bg-slate-200 bg-opacity-40 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-lg h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-center items-center'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl cursor-pointer hover:text-red-500' onClick={onClose}>
            <AiOutlineClose />  
          </div>
        </div>

        {/* Form */}
        <form className='grid p-4 gap-2 overflow-y-scroll h-full max-h-[90%] pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input
            type='text'
            name='productName'
            placeholder='Enter Product Name'
            id='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded focus:outline-none'
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            type='text'
            name='brandName'
            placeholder='Enter Brand Name'
            id='brandName'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded focus:outline-none'
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded focus:outline-none'>
            <option value={""}>Select Category</option>
            {
              productsCategory.map((e, index) => {
                return (
                  <option value={e.value} key={e.value + index}>{e.label}</option>
                )
              })
            }
          </select>

          <label htmlFor='image' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex flex-col justify-center items-center gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadImage} />
              </div>
            </div>
          </label>
          <div>
            {
              data?.image[0] ? (
                <div className='flex flex-row items-center gap-2'>
                  {
                    data.image.map((e, index) => {
                      return (
                        <div key={index} className='relative'>
                          <img src={e} alt='e' width={80} height={80}
                            className='p-2 bg-slate-100 border cursor-pointer'
                            onClick={() => (
                              setOpenImage(true),
                              setShowImage(e)
                            )} />

                          <div className='absolute bottom-0 right-0 p-1 text-white bg-purple-500 rounded-full block group-hover:hidden cursor-pointer'
                            onClick={() => handleDeleteImage(index)}>
                            <MdDelete />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-500 text-xs'>*Please Upload Images...</p>
              )
            }
          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            type='number'
            name='price'
            placeholder='Enter Price'
            id='price'
            value={data.price}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded focus:outline-none'
          />

          <label htmlFor='selling' className='mt-3'>Selling Price :</label>
          <input
            type='number'
            name='selling'
            placeholder='Enter Selling Price'
            id='selling'
            value={data.selling}
            onChange={handleOnChange}    
            className='p-2 bg-slate-100 border rounded focus:outline-none'
          />

          <label htmlFor='quantity' className='mt-3'>Quantity :</label>
          <input
            type='number'
            name='quantity'
            placeholder='Enter Product Quantity'
            id='quantity'
            value={data.quantity}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded focus:outline-none'
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            type='text'
            name='description'
            placeholder='Enter Product Description'
            id='description'
            value={data.description}
            onChange={handleOnChange}
            className='p-2 h-28 bg-slate-100 border rounded resize-none focus:outline-none'
            rows={3}
          ></textarea>

          <button className='px-3 py-1 bg-purple-500 text-white mb-4 rounded-md hover:bg-purple-600'>Update Product</button>
        </form>

      </div>

      {/* View Image */}
      {
        openImage && (
          <ViewImage onClose={() => { setOpenImage(false) }} imgUrl={showImage} />
        )
      }
    </div>
  )
}

export default EditProductForm
