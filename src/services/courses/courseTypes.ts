import { StatusTypes } from "@/shared/interfaces";

export interface CourseResponseService extends StatusTypes {
  message: string;
  result: CourseType[];
}

export interface CourseType {
  name: string;
  description: string;
  profesor: ProfesorType;
  schedule: string;
  id: string;
}

interface ProfesorType {
  id: string;
  fullName: string;
}

//===============================================================
//=====================GET LIST BY COURSE========================
//===============================================================

export interface ListStudentResponseService extends StatusTypes {
  message: string;
  result: StudentType[];
}

export interface StudentType {
  name: string;
  email: string;
  id: string;
  note: number;
}

//===============================================================
//===================ADD NOTES TO STUDENTS=======================
//===============================================================

export interface AddNotesToStudentsBody {
  courseId: string;
  studentsNote: StudentsNote[];
}

interface StudentsNote {
  id: string;
  note: number;
}

//===============================================================
//=====================GET LIST BY COURSE========================
//===============================================================

export interface GetCoursesByStudienResponseService extends StatusTypes {
  message: string;
  result: CourseByStudent[];
}

export interface CourseByStudent {
  name: string;
  description: string;
  profesor: Profesor;
  schedule: string;
  students: Student[];
  id: string;
}

interface Student {
  id: string;
  note: number;
}

interface Profesor {
  id: string;
  fullName: string;
}
