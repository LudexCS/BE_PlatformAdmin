import { S3 } from "../config/s3.config";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import { readFile } from 'fs/promises';