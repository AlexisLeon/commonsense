import { getData } from './index';
import {
  GET_PRODUCTS,
  LOAD_PRODUCTS,
  FIND_PRODUCTS,
  GET_PRODUCT,
  CLEAR_PRODUCT,
  PRODUCT_ERROR
} from './types';

//= ===============================
// Customer actions
//= ===============================
export function getProducts(skip) {
  let url = '/products';

  if (skip) {
    url = `${url}?skip=${skip}`;
    return (dispatch, getState) => getData(LOAD_PRODUCTS, PRODUCT_ERROR, true, url, dispatch, getState);
  }

  return (dispatch, getState) => getData(GET_PRODUCTS, PRODUCT_ERROR, true, url, dispatch, getState);
}

export function findProducts(query) {
  const url = `/products?q=${query}`;
  return (dispatch, getState) => getData(FIND_PRODUCTS, PRODUCT_ERROR, true, url, dispatch, getState);
}

export function getProduct(id) {
  const url = `/products/${id}`;
  return (dispatch, getState) => getData(GET_PRODUCT, PRODUCT_ERROR, true, url, dispatch, getState);
}

export function clearProduct() {
  return dispatch => dispatch({
    type: CLEAR_PRODUCT,
  });
}
