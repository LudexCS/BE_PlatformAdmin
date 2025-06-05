// package: itemAdministration
// file: itemAdministration.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as itemAdministration_pb from "./itemAdministration_pb";

interface IitemAdministrationServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    suspendItem: IitemAdministrationServiceService_IsuspendItem;
    resumeItem: IitemAdministrationServiceService_IresumeItem;
    checkOnSale: IitemAdministrationServiceService_IcheckOnSale;
}

interface IitemAdministrationServiceService_IsuspendItem extends grpc.MethodDefinition<itemAdministration_pb.itemRequest, itemAdministration_pb.itemResponse> {
    path: "/itemAdministration.itemAdministrationService/suspendItem";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<itemAdministration_pb.itemRequest>;
    requestDeserialize: grpc.deserialize<itemAdministration_pb.itemRequest>;
    responseSerialize: grpc.serialize<itemAdministration_pb.itemResponse>;
    responseDeserialize: grpc.deserialize<itemAdministration_pb.itemResponse>;
}
interface IitemAdministrationServiceService_IresumeItem extends grpc.MethodDefinition<itemAdministration_pb.itemRequest, itemAdministration_pb.itemResponse> {
    path: "/itemAdministration.itemAdministrationService/resumeItem";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<itemAdministration_pb.itemRequest>;
    requestDeserialize: grpc.deserialize<itemAdministration_pb.itemRequest>;
    responseSerialize: grpc.serialize<itemAdministration_pb.itemResponse>;
    responseDeserialize: grpc.deserialize<itemAdministration_pb.itemResponse>;
}
interface IitemAdministrationServiceService_IcheckOnSale extends grpc.MethodDefinition<itemAdministration_pb.itemRequest, itemAdministration_pb.isOnSaleResponse> {
    path: "/itemAdministration.itemAdministrationService/checkOnSale";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<itemAdministration_pb.itemRequest>;
    requestDeserialize: grpc.deserialize<itemAdministration_pb.itemRequest>;
    responseSerialize: grpc.serialize<itemAdministration_pb.isOnSaleResponse>;
    responseDeserialize: grpc.deserialize<itemAdministration_pb.isOnSaleResponse>;
}

export const itemAdministrationServiceService: IitemAdministrationServiceService;

export interface IitemAdministrationServiceServer extends grpc.UntypedServiceImplementation {
    suspendItem: grpc.handleUnaryCall<itemAdministration_pb.itemRequest, itemAdministration_pb.itemResponse>;
    resumeItem: grpc.handleUnaryCall<itemAdministration_pb.itemRequest, itemAdministration_pb.itemResponse>;
    checkOnSale: grpc.handleUnaryCall<itemAdministration_pb.itemRequest, itemAdministration_pb.isOnSaleResponse>;
}

export interface IitemAdministrationServiceClient {
    suspendItem(request: itemAdministration_pb.itemRequest, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    suspendItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    suspendItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    resumeItem(request: itemAdministration_pb.itemRequest, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    resumeItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    resumeItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    checkOnSale(request: itemAdministration_pb.itemRequest, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.isOnSaleResponse) => void): grpc.ClientUnaryCall;
    checkOnSale(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.isOnSaleResponse) => void): grpc.ClientUnaryCall;
    checkOnSale(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.isOnSaleResponse) => void): grpc.ClientUnaryCall;
}

export class itemAdministrationServiceClient extends grpc.Client implements IitemAdministrationServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public suspendItem(request: itemAdministration_pb.itemRequest, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    public suspendItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    public suspendItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    public resumeItem(request: itemAdministration_pb.itemRequest, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    public resumeItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    public resumeItem(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.itemResponse) => void): grpc.ClientUnaryCall;
    public checkOnSale(request: itemAdministration_pb.itemRequest, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.isOnSaleResponse) => void): grpc.ClientUnaryCall;
    public checkOnSale(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.isOnSaleResponse) => void): grpc.ClientUnaryCall;
    public checkOnSale(request: itemAdministration_pb.itemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: itemAdministration_pb.isOnSaleResponse) => void): grpc.ClientUnaryCall;
}
