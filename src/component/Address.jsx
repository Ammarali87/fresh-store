import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { AuthorContext } from '../Mycontex/Authorcontext';
import { useParams } from 'react-router-dom';

export default function Address() {
  const { cartId } = useParams();
  const { isLoggin, setIsLoggin } = useContext(AuthorContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = yup.object({
    details: yup
      .string()
      .min(3, '3 characters at least')
      .max(22, 'Max is 22 characters')
      .required('This is required'),
    city: yup
      .string()
      .min(3, '3 characters at least')
      .max(22, 'Max is 22 characters')
      .required('This is required')
      .matches(/[a-zA-Z]{2,6}/, 'city is not valid'),
    phone: yup
      .string()
      .min(5, '5 characters at least')
      .max(22, 'Max is 22 characters')
      .required('This is required')
      .matches(/\d{5,}/, 'Phone number must have at least 5 digits'),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setErrorMessage('');
    console.log(cartId)
      checkOut(formik.values)
  };

  async function checkOut(address) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+cartId,
        {
          shippingAddress: {
            details: address.details,
            phone: address.phone,
            city: address.city
          }
        },
        {
          headers: {
            token: localStorage.getItem("token") 
          },
          params: {
            url : "https://localhost:5173"
          } 
        }
      );
      console.log("Checkout session created !:", cartId, data);  
      open(data.session.url, '_self');
    } catch (error) {
      console.error("Error creating checkout session:", error); 
    }
    setLoading(false);
  } 

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="p-7 min-h-[60vh] bg-rose-400 text-center">
      <h3> Address</h3>
      <div className="text-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your details
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              type="text"
              id="details"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="details"
              required
            />
            {formik.touched.details && formik.errors.details && (
              <p className="mt-2 rounded text-white bg-red-500">
                {formik.errors.details}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              type="text"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="phone"
              required
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-2 rounded text-white bg-red-500">
                {formik.errors.phone}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your city
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              type="text"
              id="city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {formik.touched.city && formik.errors.city && (
              <p className="mt-2 rounded text-white bg-red-500">
                {formik.errors.city}
              </p>
            )}
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{' '}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>

          {errorMessage && (
            <p className="mt-2 rounded text-white bg-red-500">{errorMessage}</p>
          )}

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!loading ? 'Check Out' : 'Loading...'}
          </button>
        </form>
      </div>
    </div>
  );
}

  //my local host  url: "https://vitejsvitek3nqwb-0bcn--5173--c3e5e364.local-credentialless.webcontainer.io" 
