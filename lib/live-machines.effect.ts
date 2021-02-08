import { useEffect } from "react";

export default function liveMachinesEffect(urlTokens: string[], machines: any[], machinesChange: any) {
  useEffect(() => {
    let refreshTimeout;
    async function refreshMachines() {
      const updatedMachines = [];
      for (const urlToken of (urlTokens || [])) {
        try {

          const response = await fetch(urlToken + "/api/v1/sysinfo/general");

          if (response.status !== 200) throw {
            status: response.status,
            statusText: response.statusText
          };

          updatedMachines.push({
            ...await response.json(),
            urlToken
          });

        } catch (error) {

          console.error(error)
          updatedMachines.push({
            ...machines?.find(p => p.urlToken === urlToken),
            error,
            urlToken,
          });
        }
      }

      machinesChange(updatedMachines);
      refreshTimeout = setTimeout(() => refreshMachines(), 3000);
    }

    refreshMachines();

    return () => { clearTimeout(refreshTimeout) };
  }, []);
}