import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginnAjaxCall } from './ajaxStatusAction';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    
    dispatch(beginnAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}