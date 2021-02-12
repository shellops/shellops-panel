import { SysInfo } from './sys-info.namespace';

export interface GeneralSysInfo {
    memories: SysInfo.MemLayoutData[],
    cpu: SysInfo.CpuData,
    system: SysInfo.SystemData,
    os: SysInfo.OsData,
    disks: SysInfo.DiskLayoutData[],
    graphics: SysInfo.GraphicsData,
    networks: SysInfo.NetworkInterfacesData[],
    versions: SysInfo.VersionData
}