import { useEffect } from 'react';

import fetchMachine from './fetch-machine';


async function refreshMachines(urlTokens: string[]) {
  const updatedMachines = [];
  for (const urlToken of (urlTokens || [])) {
    try {
      updatedMachines.push({
        general: await fetchMachine("/api/v1/sysinfo/general", urlToken),
        geoIp: await fetchMachine("/api/v1/sysinfo/geo-ip", urlToken),
        urlToken
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

export default function useLiveMachinesEffect(  machinesChange: any) {

  useEffect(() => {
    let refreshTimeout;

    const recurr = async () => {
      const updatedMachines = await refreshMachines(getUrlTokens() );

      machinesChange(updatedMachines);

      refreshTimeout = setTimeout(() => {
        recurr();
      }, 3000);
    };

    recurr();

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, []);
}