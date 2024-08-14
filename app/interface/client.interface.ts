export interface IClientSocketComponent {
    id: number,
    info: IClientInfo;
    onDelete?: (id: number) => void;
}

export interface IClientInfo {
    zoneId: string;
    storeId: string;
    machineId: string;
    socketUrl: string;
}