import client from "./client";
import { User } from "@/types/auth";

export default {
  login: (user: User) => {
    return new Promise((resolve, reject) => {
      client
        .post("/api/login", user)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
};
