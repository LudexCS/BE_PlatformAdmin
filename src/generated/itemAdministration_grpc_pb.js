// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var itemAdministration_pb = require('./itemAdministration_pb.js');

function serialize_itemAdministration_isOnSaleResponse(arg) {
  if (!(arg instanceof itemAdministration_pb.isOnSaleResponse)) {
    throw new Error('Expected argument of type itemAdministration.isOnSaleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_itemAdministration_isOnSaleResponse(buffer_arg) {
  return itemAdministration_pb.isOnSaleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_itemAdministration_itemRequest(arg) {
  if (!(arg instanceof itemAdministration_pb.itemRequest)) {
    throw new Error('Expected argument of type itemAdministration.itemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_itemAdministration_itemRequest(buffer_arg) {
  return itemAdministration_pb.itemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_itemAdministration_itemResponse(arg) {
  if (!(arg instanceof itemAdministration_pb.itemResponse)) {
    throw new Error('Expected argument of type itemAdministration.itemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_itemAdministration_itemResponse(buffer_arg) {
  return itemAdministration_pb.itemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var itemAdministrationServiceService = exports.itemAdministrationServiceService = {
  suspendItem: {
    path: '/itemAdministration.itemAdministrationService/suspendItem',
    requestStream: false,
    responseStream: false,
    requestType: itemAdministration_pb.itemRequest,
    responseType: itemAdministration_pb.itemResponse,
    requestSerialize: serialize_itemAdministration_itemRequest,
    requestDeserialize: deserialize_itemAdministration_itemRequest,
    responseSerialize: serialize_itemAdministration_itemResponse,
    responseDeserialize: deserialize_itemAdministration_itemResponse,
  },
  resumeItem: {
    path: '/itemAdministration.itemAdministrationService/resumeItem',
    requestStream: false,
    responseStream: false,
    requestType: itemAdministration_pb.itemRequest,
    responseType: itemAdministration_pb.itemResponse,
    requestSerialize: serialize_itemAdministration_itemRequest,
    requestDeserialize: deserialize_itemAdministration_itemRequest,
    responseSerialize: serialize_itemAdministration_itemResponse,
    responseDeserialize: deserialize_itemAdministration_itemResponse,
  },
  checkOnSale: {
    path: '/itemAdministration.itemAdministrationService/checkOnSale',
    requestStream: false,
    responseStream: false,
    requestType: itemAdministration_pb.itemRequest,
    responseType: itemAdministration_pb.isOnSaleResponse,
    requestSerialize: serialize_itemAdministration_itemRequest,
    requestDeserialize: deserialize_itemAdministration_itemRequest,
    responseSerialize: serialize_itemAdministration_isOnSaleResponse,
    responseDeserialize: deserialize_itemAdministration_isOnSaleResponse,
  },
};

exports.itemAdministrationServiceClient = grpc.makeGenericClientConstructor(itemAdministrationServiceService, 'itemAdministrationService');
