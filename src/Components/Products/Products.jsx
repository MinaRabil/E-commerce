import React, { useEffect } from 'react'
import styles from './Products.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function Products() {

  function Products() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  useEffect(() => { refetch() }, [])


  const { isError, data, isLoading, error, refetch } =
    useQuery(
      'products',
      Products,
      {
        cacheTime: 2000,
        /*        refetchOnMount : false,
               refetchInterval: 1000,
               refetchOnWindowFocus: true,
               refetchOnReconnect: true,
               refetchIntervalInBackground: true, */
        enabled: false,
      }

    );




  return (
    <section className='py-5'>

      {isLoading && <Loader />}

      {
        isError && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

      {

        data?.data.data && (
          <div className='container'>
            <h2>FeaturedProduct</h2>
            <div className='row'>
              {data.data.data.map((product) => (
                <div key={product.id} className='col-md-2 '>
                  <div className='product mb-3'>
                    <Link to={`/product-details/${product.id}`}>
                      <img className='img-fluid mb-2' src={product.imageCover} alt={product.title} />
                      <h3 className='h6 text-danger fw-bolder mb-2'>{product.category.name}</h3>
                      <h3 className='h6 fw-bolder mb-2'>{product.title.split(" ").slice(0, 4).join(" ")}</h3>
                      <div className="d-flex justify-content-between mb-2">
                        <h4 className='h6'>{product.price} EGP</h4>
                        <h4 className='h6'> <i className='fas fa-star text-danger'></i> {product.ratingsAverage}</h4>

                      </div>
                    </Link>
                  </div>

                </div>
              ))}


            </div>
          </div>

        )
      }






      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


    </section >


  )
}
