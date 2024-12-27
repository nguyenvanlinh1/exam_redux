import { toast } from "react-toastify";
import { SerializedError } from "@reduxjs/toolkit";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../../configs/TypeError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

interface IError {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const handleError = ({ error }: IError) => {
  const navigate = useNavigate();
  if (error) {
    if (isFetchBaseQueryError(error)) {
      navigate(`/error/${error.status}`);
    } else if (isErrorWithMessage(error)) {
      toast.error(error.message);
    }
  }
};
