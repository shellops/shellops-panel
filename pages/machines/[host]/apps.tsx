import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { LineSeries, XYPlot } from "react-vis";

import { AppProps } from "../../../lib/interfaces/app-props.interface";
import styles from "./apps.module.scss";

export default function Apps({ machine }: AppProps) {
  const [realtime, realtimeChange] = useState({});
  const [charts, chartsChange] = useState({});

  const ws: { current: WebSocket } = useRef(null);

  useEffect(() => {
    if (ws.current) return;

    ws.current = new WebSocket("ws://localhost:3000");
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
            new Array(20).fill({ y: realtime[id].stats.memory })),
          { y: realtime[id].stats.memory },
        ].map((v, i) => ({ ...v, x: i })),
        cpu: [
          ...(charts[id]?.cpu ||
            new Array(20).fill({ y: realtime[id].stats.cpu })),
          { y: realtime[id].stats.cpu },
        ].map((v, i) => ({ ...v, x: i })),
      };

      chartsChange(charts);
    };

    () => {};
  }, [realtime, charts]);

  return (
    <>
      <div className={styles.bg}></div>
      <div className="container">
        {machine?.containers?.map((container) => (
          <div key={container.Id} className={styles.app}>
            <div className={styles.title}>
              <img src={container.app?.logo} alt="" />
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
                <button>
                  <img src="/icons/solid/play.svg" alt="" />
                  Start
                </button>
              ) : (
                <button>
                  <img src="/icons/solid/stop.svg" alt="" />
                  Stop
                </button>
              )}

              <button>
                <img src="/icons/solid/trash.svg" alt="" />
                Uninstall
              </button>
            </div>

            <ul>
              <li>
                Status: <span>{realtime[container.Id]?.State?.Status}</span>
              </li>

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

              <li>
                Image: <span>{container.Image}</span>
              </li>

              <li>
                Created:{" "}
                <span>{moment(container.Created * 1000).fromNow()}</span>
              </li>
              <li>
                Started:{" "}
                <span>
                  {moment(realtime[container.Id]?.State.StartedAt).fromNow()}
                </span>
              </li>
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
                  <ul>
                    {container.Mounts.map((item, i) => (
                      <li key={i}>
                        <span> {item.Source || "-"} </span> {"->"}
                        <span> {item.Destination || "-"}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <></>
              )}

              {realtime[container.Id].Config?.Env?.length ? (
                <li>
                  Variables:
                  <ul className={styles.variables}>
                    {realtime[container.Id].Config.Env.map((item, i) => (
                      <li key={i}>
                        <span> {item.split("=")[0]} </span>
                        <input type="text" readOnly value={item.split("=")[1]} />
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
