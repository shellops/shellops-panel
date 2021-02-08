import { Container } from './docker.namespace';
import { GeneralSysInfo } from './general-sys-info.interface';
import { GeoIpSysInfo } from './geoip-sys-info.interface';

export interface MachineInfo {
    urlToken: any;
    containers: Container[];

    host: string;

    general: GeneralSysInfo;

    geoIp: GeoIpSysInfo;

    error: { status: number, statusText: string }
}