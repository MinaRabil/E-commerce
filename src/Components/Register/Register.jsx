import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',

  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i, 'Invalid Phone Number').required('Phone is required'),
    password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/i, 'Invalid Password').required('Password is required'),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], 'Re-Password does not match'),
  });


  const formik = useFormik({
    initialValues: initialValues,


    /*     validate: (values) => handleValidation(values),*/

    validationSchema,


    onSubmit: (values) => handleRegister(values),

  });


  async function handleRegister(values) {
    console.log(values);
    setIsLoading(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",
      values).then((res) => {
        console.log(res);
        if(res.data.message == "success"){
          setIsLoading(false);
          setError(null);
          navigate("/login")
        }
      })
      
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setIsLoading(false);
      })

    /*     try {
          if (data.message == "success") {
            setIsLoading(false);
            // go to login
          }
        } catch (error) {
          console.log(error)
          setError(error.response.data.message);
          setIsLoading(false);
    
        } */





  }


  /*   function handleValidation(values) {
      console.log('valedate');
      let errors = {}
      if (!values.name) {
        errors.name = 'Name is Required'
      } else if (values.name.length < 3) {
        errors.name = "Name Should be at least 3 characters";
      } else if (values.name.length > 15) {
        errors.name = "Name Should be at Max 15 characters";
      }
  
      if (!values.email) {
        errors.email = 'Email is Required'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
  
      if (!values.phone) {
        errors.phone = 'Phone is Required'
      } else if (
        !/^(002)?01[0125][0-9]{8}$/i.test(values.phone)
      ) {
        errors.phone = 'Invalid Phone Number';
      }
  
      if (!values.password) {
        errors.password = 'Password is Required'
      } else if (values.password.length < 3) {
        errors.password = "Password Should be at least 3 characters";
      } else if (values.password.length > 12) {
        errors.password = "Password Should be at Max 12 characters";
      } else if (!/^[A-Z][A-Za-z0-9_]{2,11}$/i.test(values.password)) {
        errors.password = "Password Should Contain char capital and numbers";
      }
      if (!values.rePassword) {
        errors.rePassword = 'Confirm Password is Required'
      } else if (values.rePassword != values.password) {
        errors.rePassword = 'Re-Password does not match';
      }
      return errors
    } */

  return (<section>
    <div className='container'>
    {
      error && (
        <div className='alert alert-danger mt-5 text-center'>{error}</div>
      )
    }
      <form onSubmit={formik.handleSubmit} className='w-75 my-5'>
        <h1>Register Now</h1>
        <div className='mb-3'>
          <label htmlFor="name" className='form-label'>
            Name
          </label>
          <input type="text"
            name='name'
            id='name'
            className='form-control'
            placeholder='Name...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && <span className='text-danger'>{formik.errors.name}</span>
          }


        </div>
        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>
            Email
          </label>
          <input type="email"
            name='email'
            id='email'
            className='form-control'
            placeholder='Email...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}

          />
          {formik.errors.email && formik.touched.email && <span className='text-danger'>{formik.errors.email}</span>
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="phone" className='form-label'>
            Phone
          </label>
          <input type="tel"
            name='phone'
            id='phone'
            className='form-control'
            placeholder='Phone...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}

          />
          {formik.errors.phone && formik.touched.phone && <span className='text-danger'>{formik.errors.phone}</span>
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="password" className='form-label'>
            Password
          </label>
          <input type="password"
            name='password'
            id='password'
            className='form-control'
            placeholder='password...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}

          />
          {formik.errors.password && formik.touched.password && <span className='text-danger'>{formik.errors.password}</span>
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="rePassword" className='form-label'>
            Confirm Password
          </label>
          <input type="password"
            name='rePassword'
            id='rePassword'
            className='form-control'
            placeholder='Confirm Password...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}

          />
          {formik.errors.rePassword && formik.touched.rePassword && <span className='text-danger'>{formik.errors.rePassword}</span>
          }
        </div>

        <button type='submit' className='btn bg-danger text-white' disabled={!(formik.isValid && formik.dirty)}> 
        { isLoading ? "Loading..." : "Register" } </button>


      </form>


    </div>

    <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


  </section>
  )
}
