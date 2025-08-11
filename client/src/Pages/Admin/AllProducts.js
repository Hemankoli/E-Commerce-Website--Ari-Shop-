import React, { useState, useEffect } from 'react'
import CreateProducts from './CreateProducts'
import { MdEdit, MdDelete } from "react-icons/md";
import currancySymbol from '../../components/currancySymbol';
import EditProductForm from './EditProductForm';
import axios from 'axios'

const AllProducts = () => {
  const[opencreateproducts, setOpenCreateProducts] = useState(false)
  const[getProduct, setGetProduct] = useState([])
  const [editProduct, setEditProduct] = useState(false);

  const baseurl = process.env.REACT_APP_BACKEND_URL;

  const getAllProducts = async() => {
    const response = await fetch(`${baseurl}/get-product`)
    const dataResponse = await response.json()  
    setGetProduct(dataResponse || [])
  }

  const deleteProduct = async (productId) => {
    if (!productId) {
      console.error("Product ID is invalid or undefined.");
      return;
    }    
    try {
      const response = await axios.delete(`${baseurl}/delete-product/${productId}`)
        if (response.status === 200) {
          setGetProduct(getProduct.filter(product => product?._id !== productId))
        }
      } catch (error) {
        console.error("There was an error deleting the product!", error);
    }
  };

  useEffect(() => {  
    getAllProducts() 
  },[])
 
  useEffect(() => {
    document.body.classList.toggle('no-scroll', opencreateproducts);
  }, [opencreateproducts]);

  return (
    <div>
      <div className='bg-white border-2 border-purple-400  py-2 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Products</h1>
        <button onClick={() => setOpenCreateProducts(true)} className='border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all py-1 px-3 rounded-lg'>
          Upload Product
        </button>
      </div>

      {/* show all products */}
      {/* PRODUCT CARD START */}
      <div className='h-[calc(100vh-200px)] overflow-y-scroll'>
        <div className='mx-auto py-4 '>
            <table className='w-full border-2 border-purple-600 divide-y-2 divide-purple-600  bg-purple-600'>
                <thead>
                    <tr className='bg-purple-400'>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Sr.</th>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Image</th>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Product Name</th>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Category</th>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Price</th>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Action</th>
                        <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Delete</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-purple-600 bg-white'>
                    { Array.isArray(getProduct) && getProduct.length > 0 ? (
                          getProduct.map((product, index) => (
                              <tr key={product?._id}>
                                  <td className='px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500'>
                                      {index + 1}
                                  </td>
                                  <td className='px-4 py-2 flex justify-center items-center'>
                                      <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.productName} 
                                          className='w-8 h-8 sm:w-10 sm:h-10 object-cover' />
                                  </td>
                                  <td className='px-4 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900'>
                                      <div className=''>
                                          {product.productName}
                                      </div>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                      {product.category}
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                      {currancySymbol(product.price)}
                                  </td>
                                  <td>
                                      <div className='p-2 w-fit mx-auto text-black hover:text-white bg-green-200 hover:bg-green-500 rounded-full cursor-pointer'
                                          onClick={() => setEditProduct(product)}>
                                          <MdEdit />
                                      </div>
                                  </td>
                                  <td className=''>
                                      <button className='bg-red-300 hover:bg-red-500 text-black hover:text-white mx-auto flex p-2 text-sm rounded-full' 
                                          onClick={() => deleteProduct(product?._id)}>
                                          <MdDelete />
                                      </button>
                                  </td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="7" className="text-center py-4 text-red-500">
                                  No products found.
                              </td>
                          </tr>
                      )}

                </tbody>
            </table>
        </div>
      </div>

      {/* PRODUCT CARD END */}

      {/* Edit Product Form */}
      {/* UPDATE PRODUCT CARD START */}
           
          {editProduct && (
              <EditProductForm productData={editProduct} onClose={() => setEditProduct(false)} fetchData={getAllProducts}/>
          )}

      {/* UPDATE PRODUCT CARD END */}

      {/* show Create product form */}
      {/* CREATE PRODUCT FORM START */}

      {
        opencreateproducts && (
          <CreateProducts onClose={() => setOpenCreateProducts(false)} fetchData={getAllProducts}/>
        )
      }

      {/* CREATE PRODUCT FORM END */}


    </div> 
  )
}

export default AllProducts