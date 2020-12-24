import { TEndPoint, TRequest } from "../misc/misc";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const httpService = async (requestType: TRequest, endPoint: TEndPoint): Promise<any> => {
  if (requestType === "get") {
    const response = await fetch(`data/${endPoint}.json`, {
      method: "get",
      headers,
    });

    return response.json();
  }
};

export { httpService };
