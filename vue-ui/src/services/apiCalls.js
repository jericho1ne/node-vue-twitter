import axios from 'axios'

export default {
  /**
   * Get a user's tweets
   * @param {string} apiUrl (eg: http://localhost:3000/)
   * @param {string} params url params to be appended
   * @return {Promise}
   */
  getUserData: (apiUrl, endpoint, params) => {
    var requestUrl = `${apiUrl}${endpoint}/${params}`

    console.warn(requestUrl)

    const headersAndParams = {
      method: 'get',
      url: requestUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
      }
    }

    return axios(headersAndParams).then((response) => {
      return response.data
    })
  },
}
