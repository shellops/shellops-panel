import { GeneralSysInfo } from "./general-sys-info.interface";
import { GeoIpSysInfo } from "./geoip-sys-info.interface";

export interface ShellNode {
    docker: any;
    selected: boolean;

    host: string;

    general: GeneralSysInfo;

    geoIp: GeoIpSysInfo;

}