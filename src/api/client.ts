import axios from "axios";

export default axios.create();

export function createAuthorization(token?: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
