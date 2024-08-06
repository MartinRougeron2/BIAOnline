import { API_URL } from "../constan.local";
import { onMount } from "svelte";

interface IResponse {
  status: number;
  json: any;
}

// EmptyStorage is a type that represents an empty storage
type EmptyStorage = {
  getItem: () => null;
  setItem: () => null;
  removeItem: () => null;
};

let localStorage: Storage | EmptyStorage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};

type fetchType = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

// GETs data from the API
async function fetchData(
  url: string,
  fetchParameter: fetchType,
): Promise<IResponse> {
  try {
    const response = await fetchParameter(API_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        return { status: 401, json: null };
      } else {
        return { status: response.status, json: null };
      }
    }
    return { status: response.status, json: await response.json() };
  } catch (error: any) {
    console.error(error.message);
    return { status: 500, json: null };
  }
}

//PATCHs data to the API
async function patchData(
  url: string,
  id: number,
  data: any,
): Promise<IResponse> {
  try {
    const response = await fetch(API_URL + url + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        return { status: 401, json: null };
      } else {
        return { status: response.status, json: null };
      }
    }
    return { status: response.status, json: await response.json() };
  } catch (error: any) {
    console.error(error.message);
    return { status: 500, json: null };
  }
}

// POSTs data to the API
async function postData(url: string, data: any): Promise<IResponse> {
  try {
    const response = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        return { status: 401, json: null };
      } else {
        return { status: response.status, json: null };
      }
    }
    return { status: response.status, json: await response.json() };
  } catch (error: any) {
    console.error(error.message);
    return { status: 500, json: null };
  }
}

export { fetchData, patchData, postData, type IResponse };
