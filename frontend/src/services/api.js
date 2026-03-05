import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getInstances = () => API.get("/instances");
export const getBuckets = () => API.get("/buckets");
export const getCISResults = () => API.get("/cis-results");