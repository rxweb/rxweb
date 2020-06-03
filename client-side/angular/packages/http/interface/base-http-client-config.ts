import { XhrFilterConfig } from "./xhr-filter-config";
import { HttpResponse } from "../models/http-response";
import { HostUriConfig } from './host-uri-config'

export interface BaseHttpClientConfig {
    hostURIs: HostUriConfig[];
    filters?: XhrFilterConfig[];
    onError?: (response: HttpResponse) => void;
}
