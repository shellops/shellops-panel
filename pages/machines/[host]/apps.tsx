import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { LineSeries, XYPlot } from "react-vis";

import LoadingSpinner from "../../../components/layout/loading";
import fetchMachine from "../../../lib/fetch-machine";
import { AppProps } from "../../../lib/interfaces/app-props.interface";
import styles from "./apps.module.scss";

export default function Apps({ machine, refreshMachines }: AppProps) {
  const [realtime, realtimeChange] = useState({});
  const [charts, chartsChange] = useState({});
  const [loading, loadingChange] = useState(true);

  function uninstallApp(appId: string) {
    loadingChange(true);
    fetchMachine(
      `/api/v1/machine/apps/${appId}`,
      machine.urlToken,
      "DELETE"
    ).then(() => {
      refreshMachines().then(() => {
        loadingChange(false);
      });
    });
  }

  function removeContainer(containerId: string) {
    loadingChange(true);
    fetchMachine(
      `/api/v1/docker/containers/${containerId}`,
      machine.urlToken,
      "DELETE"
    ).then(() => {
      refreshMachines().then(() => {
        loadingChange(false);
      });
    });
  }

  function stopContainer(containerId: string) {
    loadingChange(true);
    fetchMachine(
      `/api/v1/docker/containers/${containerId}/stop`,
      machine.urlToken,
      "POST"
    );
  }

  function startContainer(containerId: string) {
    fetchMachine(
      `/api/v1/docker/containers/${containerId}/start`,
      machine.urlToken,
      "POST"
    );
  }

  const ws: { current: WebSocket } = useRef(null);

  useEffect(() => {
    if (ws.current || !machine?.urlToken) return;

    ws.current = new WebSocket(
      machine.urlToken.replace("http://", "ws://").replace("https://", "wss://")
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;

      if (!payload || type !== "CONTAINER_STATS") return;

      const id = payload.container.Id;

      const cpu_delta =
        payload.stats.cpu_stats.cpu_usage.total_usage -
        payload.stats.precpu_stats.cpu_usage.total_usage;
      const system_cpu_delta =
        payload.stats.cpu_stats.system_cpu_usage -
        payload.stats.precpu_stats.system_cpu_usage;
      const number_cpus = payload.stats.cpu_stats.online_cpus;

      realtime[id] = {
        ...payload.container,
        stats:
          payload.container?.State?.Status === "running"
            ? {
                memory: Math.round(
                  (payload.stats.memory_stats.usage -
                    payload.stats.memory_stats.stats.cache) /
                    1e6
                ),
                cpu: Number(
                  (
                    (cpu_delta / system_cpu_delta) *
                    number_cpus *
                    100.0
                  ).toPrecision(2)
                ),
              }
            : {},
      };

      realtimeChange({
        ...realtime,
        [id]: realtime[id],
      });

      if (realtime[id].State.Status !== "running") return;

      if (charts[id]?.memory?.length + 1 > 20) charts[id]?.memory.shift();
      if (charts[id]?.cpu?.length + 1 > 20) charts[id]?.cpu.shift();

      charts[id] = {
        memory: [
          ...(charts[id]?.memory ||
            new Array(20).fill({ y: realtime[id].stats.memory || 0 })),
          { y: realtime[id].stats.memory },
        ].map((v, i) => ({ ...v, x: i })),
        cpu: [
          ...(charts[id]?.cpu ||
            new Array(20).fill({ y: realtime[id].stats.cpu || 0 })),
          { y: realtime[id].stats.cpu },
        ].map((v, i) => ({ ...v, x: i })),
      };

      chartsChange(charts);
      loadingChange(false);
    };

    () => {};
  }, [realtime, charts, loading, machine]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className={styles.bg}></div>
      <div className={styles.apps}>
        {machine?.containers?.map((container) => (
          <div key={container.Id} className={styles.app}>
            <div className={styles.title}>
              {container.app?.logo ? (
                <img src={container.app?.logo} alt="" />
              ) : (
                <></>
              )}

              {!container.app?.name ? (
                <span>{container.Names?.[0]?.replace("/", "")}</span>
              ) : (
                <span>
                  {container.app?.name} {container.app?.version}
                </span>
              )}
            </div>

            <div className={styles.buttons}>
              {realtime[container.Id]?.State?.Status !== "running" ? (
                <button onClick={() => startContainer(container.Id)}>
                  <img src="/icons/solid/play.svg" alt="" />
                  Start
                </button>
              ) : (
                <button onClick={() => stopContainer(container.Id)}>
                  <img src="/icons/solid/stop.svg" alt="" />
                  Stop
                </button>
              )}

              <button
                onClick={() =>
                  container.app?.id
                    ? uninstallApp(container.app.id)
                    : removeContainer(container.Id)
                }
              >
                <img src="/icons/solid/trash.svg" alt="" />
                Uninstall
              </button>
            </div>

            <ul>
              <li>
                Status: <span>{realtime[container.Id]?.State?.Status}</span>
              </li>

              {charts?.[container.Id]?.memory?.length ? (
                <li>
                  Memory Usage:{" "}
                  <span>{realtime[container.Id]?.stats?.memory} MB</span>
                  <div className={styles.chart}>
                    <XYPlot dontCheckIfEmpty={true} width={330} height={80}>
                      <LineSeries
                        color={"#FF7805"}
                        data={charts?.[container.Id]?.memory || []}
                      />
                    </XYPlot>
                  </div>
                </li>
              ) : (
                <></>
              )}
              {charts?.[container.Id]?.memory?.length ? (
                <li>
                  CPU Usage: <span>{realtime[container.Id]?.stats?.cpu} %</span>
                  <div className={styles.chart}>
                    <XYPlot dontCheckIfEmpty={true} width={330} height={80}>
                      <LineSeries
                        color={"#FF7805"}
                        data={charts?.[container.Id]?.cpu || []}
                      />
                    </XYPlot>
                  </div>
                </li>
              ) : (
                <></>
              )}

              <li>
                Image: <span>{container.Image}</span>
              </li>

              <li>
                Created:{" "}
                <span>{moment(container.Created * 1000).fromNow()}</span>
              </li>

              {realtime[container.Id]?.State?.Status === "running" ? (
                <li>
                  Started:{" "}
                  <span>
                    {moment(realtime[container.Id]?.State.StartedAt).fromNow()}
                  </span>
                </li>
              ) : (
                <li>
                  Exited:{" "}
                  <span>
                    {moment(realtime[container.Id]?.State.FinishedAt).fromNow()}
                  </span>
                </li>
              )}
              {container.Ports?.length ? (
                <li>
                  Ports:
                  <ul>
                    {container.Ports.map((item, i) => (
                      <li key={i}>
                        <span> {item.PrivatePort || "-"} </span> {"->"}
                        <span> {item.PublicPort || "-"}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <></>
              )}

              {container.Mounts?.length ? (
                <li>
                  Mounts:
                  <ul className={styles.mounts}>
                    {container.Mounts.map((item, i) => (
                      <li key={i}>
                        <input
                          type="text"
                          readOnly
                          value={`${item.Source || "-"}:${item.Destination}`}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <></>
              )}

              {realtime[container.Id]?.Config?.Env?.length ? (
                <li>
                  <ul className={styles.variables}>
                    {realtime[container.Id].Config.Env.map((item, i) => (
                      <li key={i}>
                        <span> {item.split("=")[0]} </span>
                        <input
                          type="text"
                          readOnly
                          value={item.split("=")[1]}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
