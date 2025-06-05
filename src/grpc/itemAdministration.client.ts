import * as grpc from "@grpc/grpc-js";
import {itemAdministrationServiceClient} from "../generated/itemAdministration_grpc_pb";
import {itemRequest} from "../generated/itemAdministration_pb";

const SERVICE_NAME = process.env.WEB3GATEWAY_INNER as string;

const client = new itemAdministrationServiceClient(
    SERVICE_NAME,
    grpc.credentials.createInsecure()
);

export async function isOnSale(itemId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const request = new itemRequest();
        request.setItemid(itemId);

        client.checkOnSale(request, (err, res) => {
            if (err) {
                console.error('gRPC Error:', err);
                return reject(err);
            }
            resolve(res.getIsonsale());
        });
    });
}

export async function suspendSaleByItemId(itemId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const request = new itemRequest();
        request.setItemid(itemId);

        client.suspendItem(request, (err, res) => {
            if (err) {
                console.error('gRPC Error:', err);
                return reject(err);
            }
            resolve(res.getItemidsList());
        });
    });
}

export async function resumeSaleByItemId(itemId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const request = new itemRequest();
        request.setItemid(itemId);

        client.resumeItem(request, (err, res) => {
            if (err) {
                console.error('gRPC Error:', err);
                return reject(err);
            }
            resolve(res.getItemidsList());
        });
    });
}