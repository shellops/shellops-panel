export interface WsPayload {

    data: {
        command: string,
        host: string,
        output: string,
        error: string,
    }

    type: string;

}