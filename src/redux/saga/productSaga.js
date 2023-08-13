import { call, put, takeEvery } from 'redux-saga/effects';
import { setCategory, setProduct } from '../pruductSlice';
import getProductFetch from '../api/getProductFetch';
import postProductFetch from '../api/postProductFetch';

// Worker
function* getallProducts() {
  try {
    const allProducts = yield call(getProductFetch);
    yield put(setProduct(allProducts));
    yield put(setCategory(allProducts));
  } catch (err) {
    yield err;
  }
}

// Worker
function* addPosts(action) {
  try {
    yield call(postProductFetch(action.products));
  } catch (err) {
    yield err;
  }
}

// Watcher
function* mySaga() {
  yield takeEvery('GET_POSTS_REQUESTED', getallProducts);
  yield takeEvery('POST_MAKE_AN_ORDER', addPosts);
}

export default mySaga;
