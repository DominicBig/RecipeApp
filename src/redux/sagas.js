import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import * as types from "./actionTypes";

import { getRecipes } from "./api";

//worker
export function* onLoadRecipesAcync({ query }) {
  try {
    console.log("query", query);
    const response = yield call(getRecipes, query);
    yield put({ type: types.FETCH_RECIPE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_RECIPE_FAIL, payload: error });
  }
}

//watcher
export function* onLoadRecipes() {
  yield takeLatest(types.FETCH_RECIPE_START, onLoadRecipesAcync);
}

const recipeSaga = [fork(onLoadRecipes)];

export default function* rootSaga() {
  yield all([...recipeSaga]);
}
