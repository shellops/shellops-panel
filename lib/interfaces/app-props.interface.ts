import { MachineInfo } from "./machine-info.interface";

export interface AppProps {

  machines?: MachineInfo[];
  machine?: MachineInfo;
  user?: any

}