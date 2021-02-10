import { useEffect, useState } from "react";

import fetchMachine from "../../../lib/fetch-machine";
import { AppProps } from "../../../lib/interfaces/app-props.interface";
import styles from "./apps.module.scss";

export default function Apps({ machine }: AppProps) {
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
              <button>
                <img src="/icons/solid/trash-alt.svg" alt="" />
                Uninstall
              </button>

              <button>
                <img src="/icons/solid/pause.svg" alt="" />
                Stop
              </button>

              <button>
                <img src="/icons/solid/play.svg" alt="" />
                Start
              </button>
            </div>

            <ul>
              <li>
                Status:
                <span>{container.State?.Status}</span>
              </li>

              <li>
                Uptime: <span>{container.Status}</span>
              </li>

              {/* <li>
                  Memory Usage:
                  <span>{container.stats?.memory_stats?.usage}</span>
                  <div className="memory"></div>
                </li> */}

              <li>
                CPU Usage
                <div className={styles.memory}></div>
              </li>

              <li>
                Image: <span>{container.Image}</span>
              </li>

              <li>
                Created At: <span>{container.Created}</span>
              </li>

              {/* <li>
        Ports:
        <ul>
            <li>
                <span> {item.PrivatePort || 'N/A'} </span> ->
                <span> {item.PublicPort || 'N/A'}</span>
            </li>
        </ul>
    </li>
    <li >
        Mounts:
        <ul>
            <li >
                <span> {item.Source || 'N/A'} </span> 
                <span> {item.Destination || 'N/A'}</span>
            </li>
        </ul>
    </li>


    <ul className="variables">
        <li >
            <label >{item.name}</label>
            <input type="text" readOnly value="item.value">
        </li>
    </ul> */}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
