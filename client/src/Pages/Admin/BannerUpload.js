import React, {useState} from 'react'

const BannerUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
        console.log(image);
    }
    return (
        <div className="container mx-auto">
            <div className='bg-white border-2 border-purple-400  py-2 mb-4 px-4 flex justify-between items-center'>
                <h1 className='font-bold text-lg'>All Orders</h1>
            </div>                
            <div className="bg-white border-2 border-purple-600 p-4 shadow-md mb-6">

                <div className="border-2 border-dashed border-purple-600 p-6 rounded-lg flex flex-col items-center justify-center mb-4">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        <div className="text-gray-500 hover:animate-bounce mb-2">
                        Drag & drop or click to upload image
                        </div>
                    </label>
                </div>
                <button className="bg-red-400 text-white font-semibold px-4 py-2 rounded">
                    Upload
                </button>
            </div>
            {
                image && (
                    <div className="mt-4">
                        <img src={image} alt="Uploaded" className="w-full rounded-md" />
                    </div>
                )
            }
        </div>
    )
}

export default BannerUpload