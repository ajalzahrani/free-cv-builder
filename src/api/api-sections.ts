import axios from '../api/axios';
import { sectionType } from '../components/Types';

export const fetchData = <T>(url: string, data: T): Promise<T[]> => {
  return axios.post(url, data).then((res) => res.data);
};

export const postData = <T>(url: string, data: T): Promise<T> => {
  return axios.post(url, data).then((res) => res.data);
};

export const updateData = <T>(url: string, data: T): Promise<T> => {
  return axios.put(url, data).then((res) => res.data);
};

export const deleteData = <T>(url: string, data: T): Promise<T> => {
  return axios.delete(url, { data }).then((res) => res.data);
};
