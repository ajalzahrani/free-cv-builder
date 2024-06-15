import axios from '../api/axios';
import { sectionType } from '../components/Types';

export const fetchData = <T>(url: string, data: T): Promise<T[]> => {
  return axios.post(url, data).then((res) => res.data);
};

// Function to omit the 'id' field from the data object
const omitId = ({ id, ...rest }) => rest;

export const postData = <T>(url: string, data: T): Promise<T> => {
  return axios.post(url, omitId(data)).then((res) => res.data);
  // return axios.post(url, data).then((res) => res.data);
};

export const updateData = <T>(url: string, data: T): Promise<T> => {
  return axios.put(url, omitId(data)).then((res) => res.data);
};

export const deleteData = <T>(url: string, data: T): Promise<T> => {
  return axios.delete(url, { data }).then((res) => res.data);
};
