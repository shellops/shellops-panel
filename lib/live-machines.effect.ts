import { useEffect } from 'react';

import fetchMachine from './fetch-machine';
import { MachineInfo } from './interfaces/machine-info.interface';


async function refreshMachines(urlTokens: string[]) {
  const updatedMachines: MachineInfo[] = [];
  for (const urlToken of (urlTokens || [])) {
    try {
      updatedMachines.push({
        general: await fetchMachine("/api/v1/sysinfo/general", urlToken),
        // geoIp: await fetchMachine("/api/v1/sysinfo/geo-ip", urlToken),
        urlToken,
        hostname: urlToken?.split("@")[1].split(":")[0],
      });

    } catch (error) {

      updatedMachines.push({
        error,
        urlToken,
      });
    }
  }

  return updatedMachines;

}

export function getUrlTokens(): string[] {
  return JSON.parse(global.localStorage?.getItem("urlTokens") || "[]")
}

export default function useLiveMachinesEffect(machinesChange: any) {

  useEffect(() => {
    let refreshTimeout;

    const recurr = async () => {
      const updatedMachines = await refreshMachines(getUrlTokens());

      machinesChange(updatedMachines);

      refreshTimeout = setTimeout(() => {
        recurr();
      }, 10000);
    };

    recurr();

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, []);
}