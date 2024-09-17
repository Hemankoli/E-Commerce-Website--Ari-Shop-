import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/all-users', {
            withCredentials: true,
        });

        if (response.status === 200) {
            setAllUsers(response.data || []);
            console.log(response.data)
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
    }
};

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container mx-auto">
      
      <div className='bg-white border-2 border-purple-400  py-2 mb-4 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Users</h1>
      </div>  

      <div className="overflow-x-auto border-2  border-purple-500 shadow-md">
        <table className="min-w-full divide-y-2 divide-purple-600 bg-white">
          <thead className='bg-purple-400'> 
            <tr>  
              <th className="px-5 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Sr.</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Created Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-600"> 
              {Array.isArray(allUsers) && allUsers.length > 0 ? (
                  allUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">{user?.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{user?.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{user?.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{new Date(user?.created_at).toLocaleDateString()}</td>
                      </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-600">No users found</td>
                  </tr>
              )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllUsers;
