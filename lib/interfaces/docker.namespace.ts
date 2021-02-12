export interface Stats extends Container {
  read: string;
  preread: string;
  pids_stats: PidsStats;
  blkio_stats: BlkioStats;
  num_procs: number;
  storage_stats: StorageStats;
  cpu_stats: CPUStats;
  precpu_stats: CPUStats;
  memory_stats: MemoryStats;
  name: string;
  id: string;
  networks: Networks;
}

export interface BlkioStats {
  io_service_bytes_recursive: IoServiceRecursive[];
  io_serviced_recursive: IoServiceRecursive[];
  io_queue_recursive: any[];
  io_service_time_recursive: any[];
  io_wait_time_recursive: any[];
  io_merged_recursive: any[];
  io_time_recursive: any[];
  sectors_recursive: any[];
}

export interface IoServiceRecursive {
  major: number;
  minor: number;
  op: string;
  value: number;
}

export interface CPUStats {
  cpu_usage: CPUUsage;
  system_cpu_usage: number;
  online_cpus: number;
  throttling_data: ThrottlingData;
}

export interface CPUUsage {
  total_usage: number;
  percpu_usage: number[];
  usage_in_kernelmode: number;
  usage_in_usermode: number;
}

export interface ThrottlingData {
  periods: number;
  throttled_periods: number;
  throttled_time: number;
}

export interface MemoryStats {
  usage: number;
  max_usage: number;
  stats: { [key: string]: number };
  limit: number;
}

export interface Networks {
  eth0: Eth0;
}

export interface Eth0 {
  rx_bytes: number;
  rx_packets: number;
  rx_errors: number;
  rx_dropped: number;
  tx_bytes: number;
  tx_packets: number;
  tx_errors: number;
  tx_dropped: number;
}

export interface PidsStats {
  current: number;
}

export interface StorageStats { }

export interface Image {
  Id: string;
  ParentId: string;
  RepoTags: string[];
  RepoDigests: string[];
  Created: number;
  Size: number;
  VirtualSize: number;
  SharedSize: number;
  Labels: any;
  Containers: number;
}

export interface ContainerConfig {
  Hostname: string;
  Domainname: string;
  User: string;
  AttachStdin: boolean;
  AttachStdout: boolean;
  AttachStderr: boolean;
  ExposedPorts: ExposedPorts;
  Tty: boolean;
  OpenStdin: boolean;
  StdinOnce: boolean;
  Env: string[];
  Cmd: string[];
  Image: string;
  Volumes: { [key: string]: Labels };
  WorkingDir: string;
  Entrypoint: string[];
  OnBuild: null;
  Labels: Labels;
}

export interface ExposedPorts {

}

export interface Labels {
}


export interface Container {
  stats: any;
  app: any;
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Port[];
  Labels: Labels;
  State: any;
  Status: string;
  HostConfig: HostConfig;
  NetworkSettings: NetworkSettings;
  Mounts: Mount[];
  Config: ContainerConfig;

}

export interface HostConfig {
  NetworkMode: string;
}

export interface Labels {
}

export interface Mount {
  Type: string;
  Name?: string;
  Source: string;
  Destination: string;
  Driver?: string;
  Mode: string;
  RW: boolean;
  Propagation: string;
}

export interface NetworkSettings {
  Networks: Networks;
}

export interface Networks {
  bridge?: Bridge;
  host?: Bridge;
}

export interface Bridge {
  IPAMConfig: null;
  Links: null;
  Aliases: null;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
  DriverOpts: null;
}

export interface Port {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}

