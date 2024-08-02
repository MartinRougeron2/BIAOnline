import { API_URL } from "../constan.local";
import { notificationStore, type INotificationStore } from "../stores";
import { dev } from "$app/environment";

interface IResponse {
  status: number;
  json: any;
}

// GETs data from the API
async function fetchData(url: string): Promise<void | IResponse> {
  try {
    const response = await fetch(API_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        notificationStore.show(
          "You are not authorized to view this page",
          "error",
        );
        return { status: 401, json: null };
      } else {
        notificationStore.show("An error occurred", "error");
        return { status: response.status, json: null };
      }
    }
    return { status: response.status, json: await response.json() };
  } catch (error: any) {
    console.error(error.message);
    notificationStore.show(error.message, "error");
  }
}

//PATCHs data to the API
async function patchData(
  url: string,
  id: number,
  data: any,
): Promise<void | IResponse> {
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
        notificationStore.show(
          "You are not authorized to view this page",
          "error",
        );
        return { status: 401, json: null };
      } else {
        notificationStore.show("An error occurred", "error");
        return { status: response.status, json: null };
      }
    }
    return { status: response.status, json: await response.json() };
  } catch (error: any) {
    console.error(error.message);
    notificationStore.show(error.message, "error");
  }
}

// POSTs data to the API
async function postData(url: string, data: any): Promise<void | IResponse> {
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
        notificationStore.show(
          "You are not authorized to view this page",
          "error",
        );
        return { status: 401, json: null };
      } else {
        notificationStore.show("An error occurred", "error");
        return { status: response.status, json: null };
      }
    }
    return { status: response.status, json: await response.json() };
  } catch (error: any) {
    console.error(error.message);
    notificationStore.show(error.message, "error");
  }
}

export { fetchData, patchData, postData, type IResponse };
