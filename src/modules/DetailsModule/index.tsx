"user client";
import IdNotFound from "@/components/IdNotFound";
import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/Button";
import { addNotesToStudents, getListByCourseService } from "@/services/courses";
import { ListStudentResponseService, StudentType } from "@/services/courses/courseTypes";
import { COURSE_DATA, CURRENT_LIST_COURSE, USER_VARIABLE } from "@/shared/constants/localStorageVariables";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import useHandleAlerts from "@/shared/hooks/useHandleAlerts";
import useStateContext from "@/shared/hooks/useStateContext";
import { ErrorResponse } from "@/shared/interfaces";
import { NewNotesTypes } from "@/shared/providers/StateProvider";
import { getLocalStorage, setLocalStorage } from "@/shared/utils/localStorageUtils";
import { useEffect, useState } from "react";
import { DataDetailTable } from "./containers/DataTableDetail/DataDetailTable";
import { ColumsDetail } from "./containers/DataTableDetail/components/ColumnsDetails";
import SpinnerLoading from "@/components/SpinnerLoading";
import { STUDENT_ROLE } from "@/shared/constants/roles";

const DetailsModule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [idNotFound, setIdNotFound] = useState(false);
  const [data, setData] = useState<StudentType[]>([]);
  const { handleErrorAlert, handleSuccessAlert } = useHandleAlerts();
  const { newListNotes, setNewListNotes } = useStateContext();

  useEffect(() => {
    executeGetDataService();
  }, []);

  const executeGetDataService = async () => {
    const user = getLocalStorage(USER_VARIABLE);
    if (user.role === STUDENT_ROLE) return;
    const currentCourse = getLocalStorage(COURSE_DATA);

    try {
      if (!currentCourse.id) {
        setIdNotFound(true);
        return;
      }

      const response = await getListByCourseService(currentCourse.id);

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        handleErrorAlert(errorMessages[errorResponse.statusCode], errorResponse.message);
        return;
      }
      const result = (response as ListStudentResponseService).result;

      setLocalStorage(CURRENT_LIST_COURSE, result);
      setData(result);
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = async () => {
    setIsLoadingBtn(true);
    try {
      const result = await addNotesToStudents(newListNotes as NewNotesTypes);

      if (!result.ok) {
        const errorResponse = result as ErrorResponse;
        handleErrorAlert(errorMessages[errorResponse.statusCode], errorResponse.message);
        return;
      }

      const response = result as ListStudentResponseService;
      setNewListNotes({});

      handleSuccessAlert(errorMessages[response.statusCode], response.message);
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const validateBtn = () => {
    const currentList = (newListNotes as NewNotesTypes).studentsNote;
    const value = currentList ? currentList : [];

    return !!value.length;
  };

  if (idNotFound) {
    return <IdNotFound />;
  }

  if (isLoading) {
    return <LoadingComponent title="LISTA DE DETALLES" />;
  }

  return (
    <div className="max-w-screen-xl flex flex-col mx-auto p-4">
      <div className="mt-2 mb-2 w-full flex-col justify-center items-center">
        <h1 className=" text-[18px] font-semibold text-center">LISTA DE DETALLES</h1>
      </div>

      <DataDetailTable columns={ColumsDetail} data={data as any} />
      <div className=" mt-4 w-full flex flex-col justify-center items-center">
        <Button disabled={!validateBtn()} className=" min-w-[200px]" onClick={() => handleOnSubmit()}>
          {isLoadingBtn ? <SpinnerLoading width="4" height="4" border="2" /> : "ACTUALIZAR LISTA"}
        </Button>
      </div>
    </div>
  );
};

export default DetailsModule;
