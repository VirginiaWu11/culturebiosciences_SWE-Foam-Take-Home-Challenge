import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class. */

class BackendApi {
  // standard request abstraction function
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.msg;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Individual API routes

  /** Samplie getImages response with 2 items:
 {
	"images": [
		{
			"dateCreated": "Wed, 08 Jan 2020 04:24:38 GMT",
			"id": 1,
			"isFoaming": null,
			"lastModified": "Wed, 23 Feb 2022 21:31:27 GMT",
			"url": "https://take-home-foam-challenge.s3.us-west-2.amazonaws.com/prod-exp13436-2020-01-08-at-04.24.38-9zijoye9dteugy6agooo506u3c6wrin920a99mavvv4z9mahkt7qbu6thl2l3v39.png"
		},
		{
			"dateCreated": "Wed, 08 Jan 2020 04:25:42 GMT",
			"id": 2,
			"isFoaming": null,
			"lastModified": "Wed, 23 Feb 2022 21:31:27 GMT",
			"url": "https://take-home-foam-challenge.s3.us-west-2.amazonaws.com/prod-exp13436-2020-01-08-at-04.25.42-0fw8tob3vhrhl8u0f3mu2g37bwnojkpwiaku4rfi3xk868y7dygr2hbge1oenzmc.png"
		},
  ],
  "totalPages": 1050
}
*/

  static async getImages(page = 1, itemsPerPage = 10, isFoaming = "all") {
    const requestObj = {
      per_page: itemsPerPage,
      page_num: page,
      is_foaming: isFoaming,
    };
    let res = await this.request(`images`, requestObj);
    return res;
  }

  static async classify(id, isFoaming) {
    await this.request(`images/${id}`, { isFoaming: isFoaming }, "post");
    return;
  }
}

export default BackendApi;
