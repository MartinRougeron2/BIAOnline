import { API_URL } from '../constan.local';
import { notificationStore, type INotificationStore} from '../stores';

interface IResponse {
    status: number;
    json: any;
}

async function fetchData(url: string) : Promise<void | IResponse> {
    try {
        const response = await fetch(API_URL + url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            referrerPolicy: 'no-referrer',
        });
        if (!response.ok) {
            if (response.status === 401) {
                notificationStore.show('You are not authorized to view this page', 'error');
                return { status: 401, json: null };
            }
            else {
                notificationStore.show('An error occurred', 'error');
                return { status: response.status, json: null };
            }
        }
        return { status: response.status, json: await response.json() };
    } catch (error) {
        console.error(error.message)
        notificationStore.show(error.message, 'error');
    }
}

export { fetchData, IResponse };