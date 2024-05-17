import { ErrorResponse } from "@/shared/interfaces";
import { connection } from "../config/connection";
import {
  AddNotesToStudentsBody,
  CourseResponseService,
  GetCoursesByStudienResponseService,
  ListStudentResponseService,
} from "./courseTypes";
import { COURSE_PATHS_SERVICE } from "./coursesPaths";

const { GET_ALL_COURSES_PATH, GET_LIST_BY_COURSE_PATH, GET_COURSES_BY_PROFESSOR, ADD_NOTES_TO_STUDENTS, GET_COURSES_BY_STUDENT } =
  COURSE_PATHS_SERVICE;
const API = connection();

export const getListByCourseService = async (id: string): Promise<ListStudentResponseService | ErrorResponse> => {
  const path = GET_LIST_BY_COURSE_PATH.replace(":id", id);
  const result = await API.get(path);
  return result;
};

export const getCoursesByProfesor = async (id: string): Promise<CourseResponseService | ErrorResponse> => {
  const path = GET_COURSES_BY_PROFESSOR.replace(":id", id);
  const result = await API.get(path);
  return result;
};

export const getAllCoursesService = async (): Promise<CourseResponseService | ErrorResponse> => {
  const result = await API.get(GET_ALL_COURSES_PATH);
  return result;
};

export const addNotesToStudents = async (body: AddNotesToStudentsBody): Promise<any | ErrorResponse> => {
  const result = await API.post(ADD_NOTES_TO_STUDENTS, body);
  return result;
};

export const getCoursesByStudent = async (id: string): Promise<GetCoursesByStudienResponseService | ErrorResponse> => {
  const path = GET_COURSES_BY_STUDENT.replace(":id", id);
  const result = await API.get(path);
  return result;
};
