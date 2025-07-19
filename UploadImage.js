import React from 'react';

const url = `https://api.cloudinary.com/v1_1/dsj8izwdl/image/upload`;

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image); 
  formData.append('upload_preset', 'ecommerce_products');

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  return response.json(); 
}

export default UploadImage;
