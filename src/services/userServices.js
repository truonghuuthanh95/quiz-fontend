import { BASE_URL, LOGIN, GDTX_REGISTER } from "./api";
import axios from "axios";
export const requestLogin = (studentCode, studentName) => {
  return axios
    .post(`${BASE_URL + LOGIN}`, { studentCode, studentName })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const registGDTX = (StudentName, SchoolName, DOB, ClassName, Email) => {
  return axios
    .post(`${BASE_URL + GDTX_REGISTER}`, {
      StudentName,
      SchoolName,
      DOB,
      ClassName,
      Email
    })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
};
