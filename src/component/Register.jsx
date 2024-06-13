import { useFormik } from "formik";
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { AuthorContext } from "../Mycontex/Authorcontext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { isLoggin, setIsLoggin } = useContext(AuthorContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = yup.object({
    name: yup.string().min(3, "3 characters at least").max(22, "Max is 22 characters").required("This is required"),
    email: yup.string().min(3, "3 characters at least").max(22, "Max is 22 characters").required("This is required").matches(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/, "Email is not valid"),
    phone: yup.string().min(5, "5 characters at least").max(22, "Max is 22 characters").required("This is required").matches(/\d{5,}/, "Phone number must have at least 5 digits"),
    password: yup.string().min(3, "3 characters at least").max(22, "Max is 22 characters").required("This is required").matches(/\d{3,}/, "Password must have at least 3 digits"),
    rePassword: yup.string().min(3, "3 characters at least").max(22, "Max is 22 characters").required("This is required").oneOf([yup.ref('password'), null], "Passwords must match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setErrorMessage("");
    console.log("Form values:", values); // Log form values

    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      console.log("Sign up successful, user ID:", res.data.id);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (error) {
      console.error("Sign up error:", error.response ? error.response.data : error.message); // Improved error logging
      setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      rePassword: "",
      email: "", 
      phone: "",
      password: "",
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="text-center mt-[37%]">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name"
            required
          />
          {formik.touched.name && formik.errors.name && <p className="mt-2 rounded text-white bg-red-500">{formik.errors.name}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
          {formik.touched.email && formik.errors.email && <p className="mt-2 rounded text-white bg-red-500">{formik.errors.email}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="number"
            id="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="phone"
            required
          />
          {formik.touched.phone && formik.errors.phone && <p className="mt-2 rounded text-white bg-red-500">{formik.errors.phone}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {formik.touched.password && formik.errors.password && <p className="mt-2 rounded text-white bg-red-500">{formik.errors.password}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {formik.touched.rePassword && formik.errors.rePassword && <p className="mt-2 rounded text-white bg-red-500">{formik.errors.rePassword}</p>}
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
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
          </label>
        </div>

        {errorMessage && <p className="mt-2 rounded text-white bg-red-500">{errorMessage}</p>}
        {loading && <p className="mt-2 text-blue-500">Loading...</p>}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}
