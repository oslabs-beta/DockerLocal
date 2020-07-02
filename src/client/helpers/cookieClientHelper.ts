const CryptoJS = require("crypto-js");

export const getUsernameAndToken = async (): Promise<{
  username: string;
  accessToken: string;
}> => {
  //PARSE TOKEN AND USERNAME FROM COOKIES
  const nameAndToken = document.cookie.split(";");
  const username = nameAndToken[0].replace("username=", "").trim();
  const token = nameAndToken[1].replace("token=", "").trim();
  const parsedToken = decodeURIComponent(token);

  //DECRYPT TOKEN FROM COOKIES
  const decryptedToken = await CryptoJS.AES.decrypt(
    parsedToken,
    "super_secret"
  ).toString(CryptoJS.enc.Utf8);

  return { username: username, accessToken: decryptedToken };
};
