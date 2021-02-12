
export namespace SysInfo {
 
    // 1. General
  
    export interface TimeData {
      current: string;
      uptime: string;
      timezone: string;
      timezoneName: string;
    }
  
    // 2. System (HW)
  
    export interface RaspberryRevisionData {
      manufacturer: string;
      processor: string;
      type: string;
      revision: string;
    }
    export interface SystemData {
      manufacturer: string;
      model: string;
      version: string;
      serial: string;
      uuid: string;
      sku: string;
      virtual: boolean;
      raspberry?: RaspberryRevisionData;
    }
  
    export interface BiosData {
      vendor: string;
      version: string;
      releaseDate: string;
      revision: string;
    }
  
    export interface BaseboardData {
      manufacturer: string;
      model: string;
      version: string;
      serial: string;
      assetTag: string;
    }
  
    export interface ChassisData {
      manufacturer: string;
      model: string;
      type: string;
      version: string;
      serial: string;
      assetTag: string;
      sku: string;
    }
  
    // 3. CPU, Memory, Disks, Battery, Graphics
  
    export interface CpuData {
      manufacturer: string;
      brand: string;
      vendor: string;
      family: string;
      model: string;
      stepping: string;
      revision: string;
      voltage: string;
      speed: string;
      speedmin: string;
      speedmax: string;
      governor: string;
      cores: number;
      physicalCores: number;
      efficiencyCores?: number;
      performanceCores?: number;
      processors: number;
      socket: string;
      cache: CpuCacheData;
    }
  
    export interface CpuWithFlagsData extends CpuData {
      flags: string;
    }
  
    export interface CpuCacheData {
      l1d: number;
      l1i: number;
      l2: number;
      l3: number;
    }
  
    export interface CpuCurrentSpeedData {
      min: number;
      max: number;
      avg: number;
      cores: number[];
    }
  
    export interface CpuTemperatureData {
      main: number;
      cores: number[];
      max: number;
    }
  
    export interface MemData {
      total: number;
      free: number;
      used: number;
      active: number;
      available: number;
      buffcache: number;
      buffers: number;
      cached: number;
      slab: number;
      swaptotal: number;
      swapused: number;
      swapfree: number;
    }
  
    export interface MemLayoutData {
      size: number;
      bank: string;
      type: string;
      clockSpeed: number;
      formFactor: string;
      partNum: string;
      serialNum: string;
      voltageConfigured: number;
      voltageMin: number;
      voltageMax: number;
    }
  
    export interface SmartData {
      smartctl: {
        version: number[];
        platform_info: string;
        build_info: string;
        argv: string[];
        exit_status: number;
      };
      json_format_version: number[];
      device: {
        name: string;
        info_name: string;
        type: string;
        protocol: string;
      }
      smart_status: {
        passed: boolean;
      }
      ata_smart_attributes: {
        revision: number;
        table: {
          id: number;
          name: string;
          value: number;
          worst: number;
          thresh: number;
          when_failed: string;
          flags: {
            value: number;
            string: string;
            prefailure: boolean;
            updated_online: boolean;
            performance: boolean;
            error_rate: boolean;
            event_count: boolean;
            auto_keep: boolean;
          };
          raw: { value: number; string: string }
        }[];
      };
      power_on_time: {
        hours: number;
      };
      power_cycle_count: number;
      temperature: {
        current: number;
      };
      ata_smart_error_log: {
        summary: {
          revision: number;
          count: number;
        };
      };
      ata_smart_self_test_log: {
        standard: {
          revision: number;
          table: {
            type: {
              value: number;
              string: string;
            },
            status: {
              value: number;
              string: string;
              passed: boolean;
            },
            lifetime_hours: number;
          }[];
          count: number;
          error_count_total: number;
          error_count_outdated: number;
        };
      }
    }
  
    export interface DiskLayoutData {
      device: string;
      type: string;
      name: string;
      vendor: string;
      size: number;
      bytesPerSector: number;
      totalCylinders: number;
      totalHeads: number;
      totalSectors: number;
      totalTracks: number;
      tracksPerCylinder: number;
      sectorsPerTrack: number;
      firmwareRevision: string;
      serialNum: string;
      interfaceType: string;
      smartStatus: string;
      smartData?: SmartData;
    }
  
    export interface BatteryData {
      hasbattery: boolean;
      cyclecount: number;
      ischarging: boolean;
      voltage: number;
      designedcapacity: number;
      maxcapacity: number;
      currentcapacity: number;
      capacityUnit: string;
      percent: number;
      timeremaining: number,
      acconnected: boolean;
      type: string;
      model: string;
      manufacturer: string;
      serial: string;
    }
  
    export interface GraphicsData {
      controllers: GraphicsControllerData[];
      displays: GraphicsDisplayData[];
    }
  
    export interface GraphicsControllerData {
      machine: any;
      vendor: string;
      model: string;
      bus: string;
      busAddress?: string;
      vram: number;
      vramDynamic: boolean;
      subDeviceId?: string;
      driverVersion?: string;
      name?: string;
      pciBus?: string;
      fanSpeed?: number;
      memoryTotal?: number;
      memoryUsed?: number;
      memoryFree?: number;
      utilizationGpu?: number;
      utilizationMemory?: number;
      temperatureGpu?: number;
      temperatureMemory?: number;
      powerDraw?: number;
      powerLimit?: number;
      clockCore?: number;
      clockMemory?: number;
    }
  
    export interface GraphicsDisplayData {
      vendor: string;
      model: string;
      deviceName: string;
      main: boolean;
      builtin: boolean;
      connection: string;
      sizex: number;
      sizey: number;
      pixeldepth: number;
      resolutionx: number;
      resolutiony: number;
      currentResX: number;
      currentResY: number;
      positionX: number;
      positionY: number;
      currentRefreshRate: number;
    }
  
    // 4. Operating System
  
    export interface OsData {
      platform: string;
      distro: string;
      release: string;
      codename: string;
      kernel: string;
      arch: string;
      hostname: string;
      fqdn: string;
      codepage: string;
      logofile: string;
      serial: string;
      build: string;
      servicepack: string;
      uefi: boolean;
    }
  
    export interface UuidData {
      os: string;
    }
  
    export interface VersionData {
      kernel?: string;
      openssl?: string;
      systemOpenssl?: string;
      systemOpensslLib?: string;
      node?: string;
      v8?: string;
      npm?: string;
      yarn?: string;
      pm2?: string;
      gulp?: string;
      grunt?: string;
      git?: string;
      tsc?: string;
      mysql?: string;
      redis?: string;
      mongodb?: string;
      nginx?: string;
      php?: string;
      docker?: string;
      postfix?: string;
      postgresql?: string;
      perl?: string;
      python?: string;
      python3?: string;
      pip?: string;
      pip3?: string;
      java?: string;
      gcc?: string;
      virtualbox?: string;
      dotnet?: string;
    }
  
    export interface UserData {
      user: string;
      tty: string;
      date: string;
      time: string;
      ip: string;
      command: string;
    }
  
    // 5. File System
  
    export interface FsSizeData {
      fs: string;
      type: string;
      size: number;
      used: number;
      use: number;
      mount: string;
    }
  
    export interface FsOpenFilesData {
      max: number;
      allocated: number;
      available: number;
    }
  
    export interface BlockDevicesData {
      name: string;
      identifier: string;
      type: string;
      fstype: string;
      mount: string;
      size: number;
      physical: string;
      uuid: string;
      label: string;
      model: string;
      serial: string;
      removable: boolean;
      protocol: string;
    }
  
    export interface FsStatsData {
      rx: number;
      wx: number;
      tx: number;
      rx_sec: number;
      wx_sec: number;
      tx_sec: number;
      ms: number;
    }
  
    export interface DisksIoData {
      rIO: number;
      wIO: number;
      tIO: number;
      rIO_sec: number;
      wIO_sec: number;
      tIO_sec: number;
      ms: number;
    }
  
    // 6. Network related functions
  
    export interface NetworkInterfacesData {
      iface: string;
      ifaceName: string;
      ip4: string;
      ip4subnet: string;
      ip6: string;
      ip6subnet: string;
      mac: string;
      internal: boolean;
      virtual: boolean;
      operstate: string;
      type: string;
      duplex: string;
      mtu: number;
      speed: number;
      dhcp: boolean;
      dnsSuffix: string;
      ieee8021xAuth: string;
      ieee8021xState: string;
      carrier_changes: number;
    }
  
    export interface NetworkStatsData {
      iface: string;
      operstate: string;
      rx_bytes: number;
      rx_dropped: number;
      rx_errors: number;
      tx_bytes: number;
      tx_dropped: number;
      tx_errors: number;
      rx_sec: number;
      tx_sec: number;
      ms: number;
    }
  
    export interface NetworkConnectionsData {
      protocol: string;
      localaddress: string;
      localport: string;
      peeraddress: string;
      peerport: string;
      state: string;
      pid: number;
      process: string;
    }
  
    export interface InetChecksiteData {
      url: string;
      ok: boolean;
      status: number;
      ms: number;
    }
  
    export interface WifiNetworkData {
      ssid: string;
      bssid: string;
      mode: string;
      channel: number;
      frequency: number;
      signalLevel: number;
      quality: number;
      security: string[];
      wpaFlags: string[];
      rsnFlags: string[];
    }
  
    // 7. Current Load, Processes & Services
  
    export interface CurrentLoadData {
      avgload: number;
      currentload: number;
      currentload_user: number;
      currentload_system: number;
      currentload_nice: number;
      currentload_idle: number;
      currentload_irq: number;
      raw_currentload: number;
      raw_currentload_user: number;
      raw_currentload_system: number;
      raw_currentload_nice: number;
      raw_currentload_idle: number;
      raw_currentload_irq: number;
      cpus: CurrentLoadCpuData[];
    }
  
    export interface CurrentLoadCpuData {
      load: number;
      load_user: number;
      load_system: number;
      load_nice: number;
      load_idle: number;
      load_irq: number;
      raw_load: number;
      raw_load_user: number;
      raw_load_system: number;
      raw_load_nice: number;
      raw_load_idle: number;
      raw_load_irq: number;
    }
  
    export interface ProcessesData {
      all: number;
      running: number;
      blocked: number;
      sleeping: number;
      unknown: number;
      list: ProcessesProcessData[];
    }
  
    export interface ProcessesProcessData {
      pid: number;
      parentPid: number;
      name: string,
      pcpu: number;
      pcpuu: number;
      pcpus: number;
      pmem: number;
      priority: number;
      mem_vsz: number;
      mem_rss: number;
      nice: number;
      started: string,
      state: string;
      tty: string;
      user: string;
      command: string;
      params: string;
      path: string;
    }
  
    export interface ProcessesProcessLoadData {
      proc: string;
      pid: number;
      pids: number[];
      cpu: number;
      mem: number;
    }
  
    export interface ServicesData {
      name: string;
      running: boolean;
      startmode: string;
      pids: number[];
      pcpu: number;
      pmem: number;
    }
  
    // 8. Docker
  
    export interface DockerInfoData {
      id: string;
      containers: number;
      containersRunning: number;
      containersPaused: number;
      containersStopped: number;
      images: number;
      driver: string;
      memoryLimit: boolean;
      swapLimit: boolean;
      kernelMemory: boolean;
      cpuCfsPeriod: boolean;
      cpuCfsQuota: boolean;
      cpuShares: boolean;
      cpuSet: boolean;
      ipv4Forwarding: boolean;
      bridgeNfIptables: boolean;
      bridgeNfIp6tables: boolean;
      debug: boolean;
      mfd: number;
      oomKillDisable: boolean;
      ngoroutines: number;
      systemTime: string;
      loggingDriver: string;
      cgroupDriver: string;
      nEventsListener: number;
      kernelVersion: string;
      operatingSystem: string;
      osType: string;
      architecture: string;
      ncpu: number;
      memTotal: number;
      dockerRootDir: string;
      httpProxy: string;
      httpsProxy: string;
      noProxy: string;
      name: string;
      labels: string[];
      experimentalBuild: boolean;
      serverVersion: string;
      clusterStore: string;
      clusterAdvertise: string;
      defaultRuntime: string;
      liveRestoreEnabled: boolean;
      isolation: string;
      initBinary: string;
      productLicense: string;
    }
  
    export interface DockerContainerData {
      id: string;
      name: string;
      image: string;
      imageID: string;
      command: string;
      created: number;
      started: number;
      finished: number;
      createdAt: string;
      startedAt: string;
      finishedAt: string;
      state: string;
      restartCount: number;
      platform: string;
      driver: string;
      ports: number[];
      mounts: DockerContainerMountData[];
    }
  
    export interface DockerContainerMountData {
      Type: string;
      Source: string;
      Destination: string;
      Mode: string;
      RW: boolean;
      Propagation: string;
    }
  
    export interface DockerContainerStatsData {
      id: string;
      mem_usage: number;
      mem_limit: number;
      mem_percent: number;
      cpu_percent: number;
      netIO: {
        rx: number;
        wx: number;
      };
      blockIO: {
        r: number;
        w: number;
      };
      restartCount: number;
      cpu_stats: any;
      precpu_stats: any;
      memory_stats: any,
      networks: any;
    }
  
    // 9. Virtual Box
  
    export interface VboxInfoData {
      id: string;
      name: string;
      running: boolean;
      started: string;
      runningSince: number;
      stopped: string;
      stoppedSince: number;
      guestOS: string;
      hardwareUUID: string;
      memory: number;
      vram: number;
      cpus: number;
      cpuExepCap: string;
      cpuProfile: string;
      chipset: string;
      firmware: string;
      pageFusion: boolean;
      configFile: string;
      snapshotFolder: string;
      logFolder: string;
      HPET: boolean;
      PAE: boolean;
      longMode: boolean;
      tripleFaultReset: boolean;
      APIC: boolean;
      X2APIC: boolean;
      ACPI: boolean;
      IOAPIC: boolean;
      biosAPICmode: string;
      bootMenuMode: string;
      bootDevice1: string;
      bootDevice2: string;
      bootDevice3: string;
      bootDevice4: string;
      timeOffset: string;
      RTC: string;
    }
  
    // 10. "Get All at once" - functions
  
    export interface StaticData {
      version: string;
      system: SystemData;
      bios: BiosData;
      baseboard: BaseboardData;
      chassis: ChassisData;
      os: OsData;
      uuid: UuidData;
      versions: VersionData;
      cpu: CpuWithFlagsData;
      graphics: GraphicsData;
      net: NetworkInterfacesData[];
      memLayout: MemLayoutData[];
      diskLayout: DiskLayoutData[];
    }
  
  }