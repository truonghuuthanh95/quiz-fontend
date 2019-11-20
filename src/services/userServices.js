import { BASE_URL, LOGIN } from './api';
import axios from 'axios';
export const requestLogin = (studentCode, studentName) => {
    return axios.post(`${BASE_URL + LOGIN}`, {studentCode, studentName}).then(res => {
        return res.data;
    }).catch(error => {
        console.log(error)
    })
}
