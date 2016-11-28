import { queryParameters, fetchJson } from 'admin-on-rest/lib/util/fetch';
import UserList from './Users';
import {
   GET_LIST,
   GET_MATCHING,
   UPDATE,
   DELETE
} from './types';

const apiUrl = 'http://localhost:3000';

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_MATCHING => GET http://my.api.url/posts?filter={title:'bar'}
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { full_name, _id } = params.sort;
            const query = {
                sort: JSON.stringify([full_name, _id]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify(params.filter),
            };
            url = '${apiUrl}/${resource}?${queryParameters(query)}'
            break;
        }
        case GET_MATCHING: {
            const query = {
                filter: JSON.stringify(params.filter),
            };
            url = '${apiUrl}/${resource}?${queryParameters(query)}'
            break;
        }

        default:
            throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
        case GET_LIST:
            if (!headers.has('content-range')) {
                throw new Error('The Content-Range header is missing in the HTTP Response. This header is necessary for pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Allow-Headers header?');
            }
            return {
                data: json.map(x => x),
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };

        default:
            return json;
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        return httpClient(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    };
};
