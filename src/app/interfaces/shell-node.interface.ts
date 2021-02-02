import { Container } from './docker.namespace';
import { GeneralSysInfo } from './general-sys-info.interface';
import { GeoIpSysInfo } from './geoip-sys-info.interface';

export interface ShellNode {
    containers: Container[];

    host: string;

    general: GeneralSysInfo;

    geoIp: GeoIpSysInfo;

}