import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthorContext } from "../Mycontex/Authorcontext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { isLoggin, setIsLoggin } = useContext(AuthorContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {   
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", formik.values);
       localStorage.setItem("token",res.data.token)
       console.log("tokend adenddd")
      setIsLoggin(true);
      setLoading(false);
      if(location.pathname !== "/login"){
        navigate(location.pathname);
      }
      console.log("res " , res.data);
      
    } catch (error) {
      setLoading(false);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <div className="min-h-[60vh] bg-blue-200 text-center">
      <h6>Sign In</h6>
      <div className="text-center">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="mb-7 p-2 one rounded-[11px] bg-blue-300 mt-2">Hello Store</h1>
 
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 rounded text-white bg-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 rounded text-white bg-red-500">{formik.errors.password}</p>
            )}
          </div>

          {errorMessage && <p className="mt-2 rounded text-white bg-red-500">{errorMessage}</p>}
          {loading && <p className="mt-2 text-blue-500">Loading...</p>}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        </form>
        <p className="mt-5">
          Don't have an account?{"  "}
          <NavLink to="/register" className="text-blue-500 hover:underline">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
}
