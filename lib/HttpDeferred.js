define([
    "dojo/_base/declare",
    "dojo/Stateful",
    "dojo/Deferred",
    "dojo/topic"
], function(declare, Stateful, Deferred, topic) {
    "use strict";

    /**
     * This module extends a dojo/Deferred object adding http request and response
     * informations in constructor.
     * Constructor accepts http request and http response as required parameters.
     *
     * @module elenajs/HttpDeferred
     * @mixes http://dojotoolkit.org/api/1.9/dojo/Deferred.html
     *
     * @example new HttpDeferred({httpRequest: req, httpResponse: res});
     */
    var HttpDeferred = declare("elenajs.HttpDeferred", [Stateful, Deferred], {
        /**
         * HTTP request object.
         *
         *
         * @memberof module:elenajs/HttpDeferred
         *
         * @default true
         * @type {!http.ClientRequest}
         *
         * @instance
         */
        httpRequest: null,
        /**
         * HTTP response object.
         * @default true
         * @type {!http.ServerResponse}
         * @instance
         */
        httpResponse: null,
        /**
         * Parsed HTTP request parameters. If a parameters appears more then
         * once the the parameter value becomes an array.
         *
         * @default {}
         * @type {Object}
         * @instance
         */
        requestData: {},
        /**
         * This method publishes a topic exception. The exception will be handled
         * by one of the server exception handlers and each subscriber.<br>
         * The topic name is simply 'error' the event is an object with
         * 'error' and 'status' keys.<br>
         * Signals are intercepted by the elenajs/Server#onHttpError method.<br>
         * To add your exception interceptor you can just use
         * {@link http://dojotoolkit.org/api/1.9/dojo/topic.html}<br>
         * The published event is an anonymous object with the following properties:
         * <ul>
         *     <li><emph>target</enph>: The deferred object itself (bringing http request and response)</li>
         *     <li><emph>error</enph>: An Error instance (i.e. the signal)</li>
         *     <li><emph>status</enph>: The http status to return to the client</li>
         * </ul>
         *
         * @param {Error|String} error The signaled error
         * @param {int} status It's the http desired status
         *
         * @instance
         *
         * @example
         * //A very simple error interceptor
         * topic.subscribe('error', function (event) {
         *     console.error('http response status', event.status);
         *     console.error('an exception happened', event.error.message);
         * });
         */
        signal: function(error, status) {
            var err = error, self = this;
            if (typeof err === 'string') {
                err = new Error(error);
            }
            topic.publish('error', {
                target: self,
                error: error,
                status: status || 500
            });
        }
    });

    return HttpDeferred;
});