import {
  BASE_URL,
  GET_QUIZ,
  GET_SCORE,
  SUBMIT_QUIZ,
  GET_QUIZ_SUBMITED
} from "./api";
import axios from "axios";

export const getQuizs = () => {
  return axios
    .get(`${BASE_URL + GET_QUIZ}`)
    .then(resp => {
      
    })
    .catch(error => {
      
    });
};
export const getScores = () => {
  return axios
    .get(`${BASE_URL + GET_SCORE}`)
    .then(resp => {
      
    })
    .catch(error => {
      
    });
};
export const submitQuiz = data => {
  return axios.post(`${BASE_URL + SUBMIT_QUIZ}`, data);
};

export const getQuizSubmited = () => {
  return axios
    .get(`${BASE_URL + GET_QUIZ_SUBMITED}`)
    .then(res => res.data)
    .catch(error => console.log(error));
};
