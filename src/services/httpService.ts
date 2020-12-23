const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const httpService = async (endPoint: string, requestType: string): Promise<any> => {
  if (requestType === "get") {
    const response = await fetch(endPoint, {
      method: "get",
      headers,
    });

    return response.json();
  }
};

export { httpService };
