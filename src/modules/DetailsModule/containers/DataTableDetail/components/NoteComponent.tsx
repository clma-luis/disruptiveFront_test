"use client";
import { Input } from "@/components/ui/Input";
import { COURSE_DATA, USER_VARIABLE } from "@/shared/constants/localStorageVariables";
import { ADMIN_ROLE } from "@/shared/constants/roles";
import useStateContext from "@/shared/hooks/useStateContext";
import { NewNotesTypes } from "@/shared/providers/StateProvider";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { Row } from "@tanstack/react-table";
import React, { useState } from "react";

interface NoteComponentProps {
  row: Row<{
    id: string;
    note: string;
    name: string;
    email: string;
  }>;
}

const NoteComponent = (props: NoteComponentProps) => {
  const { row } = props;
  const studentId = row.getValue("id");
  const currentNote = row.getValue("note");
  const [note, setNote] = useState(currentNote as string);
  const currentUser = getLocalStorage(USER_VARIABLE);
  const currentCourse = getLocalStorage(COURSE_DATA);
  const { newListNotes, setNewListNotes } = useStateContext();

  const validateAction = () => {
    if (!currentUser) true;
    return currentUser?.role !== ADMIN_ROLE && !!Number(note) && !!currentNote;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateAction()) return;

    const val = event.target.value;

    if (!isNaN(Number(val)) && parseFloat(val) >= 0) {
      setNote(val);

      const currentList = (newListNotes as NewNotesTypes).studentsNote;
      const filterData = currentList ? currentList.filter((data) => data.id !== studentId) : [];

      const value = {
        courseId: currentCourse.id,
        studentsNote: [...filterData, { id: studentId, note: event.target.value }],
      } as NewNotesTypes;

      setNewListNotes(value);
    }
  };

  return (
    <div className="flex items-center w-16">
      <Input
        disabled={validateAction()}
        value={note}
        name="note"
        id="password"
        type="number"
        placeholder="nota"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default NoteComponent;
