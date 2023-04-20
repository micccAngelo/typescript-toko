import "./AddProduct.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import React, { useContext } from "react";
import Loadings from "../../../Reusable/Loadings";
import GetCategories from "../../../API Services/GetCategories";
import AddProducts from "../../../API Services/AddProductAPI";
import Modals from "../../../Reusable/Modals";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import Product from "../../../Model/Product";

const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Product name is required")
      .min(3, "Product name must be at least 3 characters")
      .max(15, "Product name must be less than 15 characters")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Product name can only contain letters and numbers"
      ),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(100, "Description must be less than 100 characters"),
    price: Yup.number()
      .required("Price is required")
      .min(1, "Price cannot be less than a dollar"),
    stock: Yup.number()
      .required("Stock is required")
      .min(1, "Stock cannot be less than 1"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string()
      .required("Brand is required")
      .min(3, "Brand must be at least 3 characters")
      .max(15, "Brand must be less than 15 characters"),
    thumbnail: Yup.string().required("Thumbail image is required"),
    images: Yup.string().required("Image is required"),
  });

  const onSubmit = async (values: Product, { resetForm }: any) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await AddProducts(new Product(values));
      console.log(response);
      setShowModal(true);
      setLoading(false);
      resetForm();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  if (loading) {
    return <Loadings variant="danger" />;
  }

  return (
    <div className="position">
      <Modals
        show={showModal}
        onCloseButtonClick={() => setShowModal(false)}
        title="Success!"
        message={`Product successfuly added!`}
      />
      <Formik
        initialValues={{
          id: 0,
          title: "",
          price: 0,
          brand: "",
          stock: 0,
          rating: 0,
          description: "",
          category: "",
          thumbnail: "",
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="form-position-add">
            <div className="form-group">
              <label htmlFor="title">Product Name</label>
              <Field
                type="text"
                id="title"
                placeholder="Enter Product Name"
                name="title"
                className={`form-control-field ${
                  errors.title && touched.title ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                type="text"
                id="description"
                placeholder="Enter Product Description"
                name="description"
                className={`form-control-field area ${
                  errors.description && touched.description ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                id="price"
                placeholder="0"
                name="price"
                className={`form-control-field ${
                  errors.price && touched.price ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <Field
                type="number"
                id="stock"
                placeholder="0"
                name="stock"
                className={`form-control-field ${
                  errors.stock && touched.stock ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Field
                as="select"
                id="category"
                name="category"
                className={`form-control-field ${
                  errors.category && touched.category ? "is-invalid" : ""
                }`}
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <Field
                type="text"
                id="brand"
                placeholder="Enter Product Brand"
                name="brand"
                className={`form-control-field ${
                  errors.brand && touched.brand ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">Thumbnail Image</label>
              <Field
                type="file"
                id="thumbnail"
                accept=".jpeg,.png"
                name="thumbnail"
                className={`form-control-field ${
                  errors.thumbnail && touched.thumbnail ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="thumbnail"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Image</label>
              <Field
                type="file"
                id="images"
                accept=".jpeg,.png"
                name="images"
                className={`form-control-field ${
                  errors.images && touched.images ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="images"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <Button
              type="submit"
              className="button-submit-add"
              variant="outline-primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
