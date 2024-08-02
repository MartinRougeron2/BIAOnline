import { browser, building, dev, version } from "$app/environment";

const API_URL = dev ? "/api/" : "https://backendbbia.martinrougeron.me/api/v1/";

export { API_URL };
