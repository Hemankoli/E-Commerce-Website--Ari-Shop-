import React, { useEffect, useState } from 'react'
import {useAuth} from "../../Context/index"
import axios from 'axios'


const Order = () => {

    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()


    const getOrders = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8000/orders")
            setOrders(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(auth?.token){
            getOrders()
        }
    },[auth?.token])

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-9'>
                <h1>
                    ALL ORDERS
                </h1>
                <p>{JSON.stringify(orders, null, 4)}</p>
            </div>
        </div>
    </div>
  )
}

export default Order
