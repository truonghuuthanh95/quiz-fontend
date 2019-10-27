import { BASE_URL, GET_QUIZ, GET_SCORE, SUBMIT_QUIZ } from "./api";
import axios from "axios";

export const getQuizs = () => {
  return axios
    .get(`${BASE_URL + GET_QUIZ}`)
    .then(resp => {
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
};
export const getScores = () => {
  return axios
    .get(`${BASE_URL + GET_SCORE}`)
    .then(resp => {
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
};
export const submitQuiz = data => {
  return axios
    .post(`${BASE_URL + SUBMIT_QUIZ}`, data)
};
