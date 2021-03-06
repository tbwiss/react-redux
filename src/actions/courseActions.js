import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import { beginnAjaxCall, ajaxCallError } from './ajaxStatusAction';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginnAjaxCall());
    return CourseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginnAjaxCall());
    return CourseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}