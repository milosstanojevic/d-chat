import api from "../../utils/api";
import { Message } from "../types";

const token = "HBAwxg0XMMM0"; // best way to store in ENV

const baseUrl = `https://chatty.doodle-test.com/api/chatty/v1.0/`;

type Params = {
  [key: string]: string | number;
};

export const getMessages = (params?: Params) => {
  let preparedParams: Params = { ...params, token };

  var queryString = Object.keys(preparedParams)
    .map((key) => {
      return (
        encodeURIComponent(key) + "=" + encodeURIComponent(preparedParams[key])
      );
    })
    .join("&");

  return api.get<Message[]>(`${baseUrl}?${queryString}`);
};

type NewMessage = {
  author: string;
  message: string;
};

export const saveMessage = (attributes: NewMessage) => {
  const headers = {
    "Content-Type": "application/json",
    token,
  };

  const body = JSON.stringify(attributes);

  return api.post<Message>(`${baseUrl}`, body, headers);
};
