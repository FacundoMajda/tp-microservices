import { ClientAPI } from "./client/client.api";
import { queryClient } from "./client/client.query";

const clientAPI = ClientAPI.getInstance("http://localhost:3000/");

export { clientAPI, queryClient };
