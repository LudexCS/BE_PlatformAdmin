// package: itemAdministration
// file: itemAdministration.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class itemRequest extends jspb.Message { 
    getItemid(): string;
    setItemid(value: string): itemRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): itemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: itemRequest): itemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: itemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): itemRequest;
    static deserializeBinaryFromReader(message: itemRequest, reader: jspb.BinaryReader): itemRequest;
}

export namespace itemRequest {
    export type AsObject = {
        itemid: string,
    }
}

export class itemResponse extends jspb.Message { 
    clearItemidsList(): void;
    getItemidsList(): Array<string>;
    setItemidsList(value: Array<string>): itemResponse;
    addItemids(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): itemResponse.AsObject;
    static toObject(includeInstance: boolean, msg: itemResponse): itemResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: itemResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): itemResponse;
    static deserializeBinaryFromReader(message: itemResponse, reader: jspb.BinaryReader): itemResponse;
}

export namespace itemResponse {
    export type AsObject = {
        itemidsList: Array<string>,
    }
}

export class isOnSaleResponse extends jspb.Message { 
    getIsonsale(): boolean;
    setIsonsale(value: boolean): isOnSaleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): isOnSaleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: isOnSaleResponse): isOnSaleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: isOnSaleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): isOnSaleResponse;
    static deserializeBinaryFromReader(message: isOnSaleResponse, reader: jspb.BinaryReader): isOnSaleResponse;
}

export namespace isOnSaleResponse {
    export type AsObject = {
        isonsale: boolean,
    }
}
