import { browser, building, dev, version } from "$app/environment";

const API_URL = dev
  ? "/api/"
  : "https://urchin-app-vv7cz.ondigitalocean.app/api/v1/";

export { API_URL };
