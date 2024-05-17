"user client";
import LoadingComponent from "@/components/LoadingComponent";
import { getCoursesByStudent } from "@/services/courses";
import { CourseByStudent, GetCoursesByStudienResponseService } from "@/services/courses/courseTypes";
import { COURSE_DATA, USER_VARIABLE } from "@/shared/constants/localStorageVariables";
import { STUDENT_ROLE } from "@/shared/constants/roles";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import useHandleAlerts from "@/shared/hooks/useHandleAlerts";
import { ErrorResponse } from "@/shared/interfaces";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { useEffect, useState } from "react";
import { DataStudentTable } from "./containers/DataTableDetail/DataStudentTable";
import { ColumnStudentDetails } from "./containers/DataTableDetail/components/ColumnStudentDetails";

const StudentDetailsModule = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CourseByStudent[]>([]);
  const { handleErrorAlert } = useHandleAlerts();

  useEffect(() => {
    executeGetDataService();
  }, []);

  const executeGetDataService = async () => {
    const user = getLocalStorage(USER_VARIABLE);

    try {

      const response = await getCoursesByStudent(user.id);

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        handleErrorAlert(errorMessages[errorResponse.statusCode], errorResponse.message);
        return;
      }
      const result = (response as GetCoursesByStudienResponseService).result;

      setData(result);
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingComponent title="CARGANDO DETALLES DEL ESTUDIANTE" />;
  }

  return (
    <div className="max-w-screen-xl flex flex-col mx-auto p-4">
      <div className="mt-2 mb-2 w-full flex-col justify-center items-center">
        <h1 className=" text-[18px] font-semibold text-center">LISTA DE DETALLES</h1>
      </div>
      <DataStudentTable columns={ColumnStudentDetails} data={data as any}/>
    </div>
  );
};

export default StudentDetailsModule;
