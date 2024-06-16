import axios from '../api/axios';
import { sectionType } from '../components/Types';

export const fetchData = <T>(url: string): Promise<T[]> => {
  return axios.post(url, { userId: 1 }).then((res) => res.data);
};

export const postData = <T>(url: string, data: T): Promise<T> => {
  return axios.post(url, { ...data, userId: 1 }).then((res) => res.data);
};

export const updateData = <T>(url: string, data: T): Promise<T> => {
  console.log('url: ', url, ', data: ', data);
  // const dataUserId = { ...data.header, userId: 1 };
  return axios.put(url, { ...data, userId: 1 }).then((res) => res.data);
};

export const deleteData = <T>(url: string, data: T): Promise<T> => {
  return axios.delete(url, { data: { ...data, userId: 1 } }).then((res) => res.data);
};
