import { Container } from './docker.namespace';
import { GeneralSysInfo } from './general-sys-info.interface';
import { GeoIpSysInfo } from './geoip-sys-info.interface';

export interface MachineInfo {

    urlToken?: string;

    containers?: Container[];

    apps?: any[];

    hostname?: string;

    general?: GeneralSysInfo;

    geoIp?: GeoIpSysInfo;

    error?: { status: number, statusText: string }
}