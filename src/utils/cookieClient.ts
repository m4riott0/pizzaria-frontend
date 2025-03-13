import { getCookie } from "cookies-next";

export function getCookieClient(){
  const token = getCookie("auth");
  return token;
}