/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/** @module vertx-js/net_client */
var utils = require('vertx-js/util/utils');
var Measured = require('vertx-js/measured');
var NetSocket = require('vertx-js/net_socket');
var SocketAddress = require('vertx-js/socket_address');

var io = Packages.io;
var JsonObject = io.vertx.core.json.JsonObject;
var JNetClient = Java.type('io.vertx.core.net.NetClient');

/**
 A TCP client.
 <p>
 Multiple connections to different servers can be made using the same instance.
 <p>
 This client supports a configurable number of connection attempts and a configurable
 delay between attempts.

 @class
*/
var NetClient = function(j_val) {

  var j_netClient = j_val;
  var that = this;
  Measured.call(this, j_val);

  var __super_isMetricsEnabled = this.isMetricsEnabled;
  var __super_connect = this.connect;
  var __super_connect = this.connect;
  var __super_connect = this.connect;
  var __super_connect = this.connect;
  var __super_close = this.close;
  /**
   Whether the metrics are enabled for this measured object

   @public

   @return {boolean} <code>true</code> if metrics are enabled
   */
  this.isMetricsEnabled =  function() {
    var __args = arguments;
    if (__args.length === 0) {
      return j_netClient["isMetricsEnabled()"]() ;
    } else if (typeof __super_isMetricsEnabled != 'undefined') {
      return __super_isMetricsEnabled.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Open a connection to a server at the specific <code>remoteAddress</code>.
   <p>
   The connect is done asynchronously and on success, a {@link NetSocket} instance is supplied via the <code>connectHandler</code> instance

   @public
   @param remoteAddress {SocketAddress} the remote address 
   @param serverName {string} the SNI server name 
   @param connectHandler {function} 
   @return {NetClient} a reference to this, so the API can be used fluently
   */
  this.connect =  function() {
    var __args = arguments;
    if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      j_netClient["connect(int,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(ar) {
        if (ar.succeeded()) {
          __args[2](utils.convReturnVertxGen(NetSocket, ar.result()), null);
        } else {
          __args[2](null, ar.cause());
        }
      }) ;
      return that;
    } else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_netClient["connect(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(ar) {
        if (ar.succeeded()) {
          __args[3](utils.convReturnVertxGen(NetSocket, ar.result()), null);
        } else {
          __args[3](null, ar.cause());
        }
      }) ;
      return that;
    } else if (__args.length === 2 && typeof __args[0] === 'object' && __args[0]._jdel && typeof __args[1] === 'function') {
      j_netClient["connect(io.vertx.core.net.SocketAddress,io.vertx.core.Handler)"](__args[0]._jdel, function(ar) {
        if (ar.succeeded()) {
          __args[1](utils.convReturnVertxGen(NetSocket, ar.result()), null);
        } else {
          __args[1](null, ar.cause());
        }
      }) ;
      return that;
    } else if (__args.length === 3 && typeof __args[0] === 'object' && __args[0]._jdel && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      j_netClient["connect(io.vertx.core.net.SocketAddress,java.lang.String,io.vertx.core.Handler)"](__args[0]._jdel, __args[1], function(ar) {
        if (ar.succeeded()) {
          __args[2](utils.convReturnVertxGen(NetSocket, ar.result()), null);
        } else {
          __args[2](null, ar.cause());
        }
      }) ;
      return that;
    } else if (typeof __super_connect != 'undefined') {
      return __super_connect.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Close the client.
   <p>
   Any sockets which have not been closed manually will be closed here. The close is asynchronous and may not
   complete until some time after the method has returned.

   @public

   */
  this.close =  function() {
    var __args = arguments;
    if (__args.length === 0) {
      j_netClient["close()"]();
    } else if (typeof __super_close != 'undefined') {
      return __super_close.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  // A reference to the underlying Java delegate
  // NOTE! This is an internal API and must not be used in user code.
  // If you rely on this property your code is likely to break if we change it / remove it without warning.
  this._jdel = j_netClient;
};

NetClient._jclass = utils.getJavaClass("io.vertx.core.net.NetClient");
NetClient._jtype = {accept: function(obj) {
    return NetClient._jclass.isInstance(obj._jdel);
  },wrap: function(jdel) {
    var obj = Object.create(NetClient.prototype, {});
    NetClient.apply(obj, arguments);
    return obj;
  },
  unwrap: function(obj) {
    return obj._jdel;
  }
};
NetClient._create = function(jdel) {var obj = Object.create(NetClient.prototype, {});
  NetClient.apply(obj, arguments);
  return obj;
}
module.exports = NetClient;