import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import ProductAPI from '../../../../callApi/productApi'
import { set, useForm } from 'react-hook-form'
import CategoryAPI from '../../../../callApi/categoryAPI'

function FormeditComponent() {
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        const { data } = await ProductAPI.get(id)
        setProduct(data)
        reset(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [])
  const { category } = product
  console.log(category)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: categories } = await CategoryAPI.getAll()
        setCategories(categories)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  const onSubmit = async (data) => {
    const newData = {
      ...data
    }
    await ProductAPI.updateProduct(id, newData)
    history.push('/admin/product/list')
  }
  return (
    <div className="content-header">
      {loading ? (
        <div className="text-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        ''
      )}
      {loading ? (
        ''
      ) : (
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Category</label>
              <select
                name="category"
                id=""
                {...register('category', { required: true })}
              >
                {categories.map((cate, index) => (
                  <option value={cate._id} key={index}>
                    {cate.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <small id="emailHelp" className="form-text  text-danger">
                  Category Required
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <small id="emailHelp" className="form-text  text-danger">
                  Name Required
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                {...register('price', { required: true })}
              />
              {errors.price && (
                <small id="emailHelp" className="form-text  text-danger">
                  Price Required
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Sale</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Sale"
                {...register('price_sale')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Qunatity"
                {...register('quantity', { required: true })}
              />
              {errors.quantity && (
                <small id="emailHelp" className="form-text  text-danger">
                  Quantity Required
                </small>
              )}
            </div>
          </div>
          {/*End col */}
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={5}
                {...register('description', { required: true })}
              />
              {errors.description && (
                <small id="emailHelp" className="form-text  text-danger">
                  Description Required
                </small>
              )}
            </div>
            {/*<div className="form-group">*/}
            {/*  <label htmlFor="exampleInputEmail1">Image</label>*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    className="form-control"*/}
            {/*    {...register('photo')}*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                {...register('shipping')}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Shipping
              </label>
            </div>
            <div className="py-3">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <Link to="/admin/product/list" className="btn btn-danger mx-2">
                <span>Cancel</span>
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default FormeditComponent
