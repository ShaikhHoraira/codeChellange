export declare class ManageSaveData {
    tableName: string;
    constructor(tableName?: string);
    saveDevice(DeviceToken: string, Key: string, ForgeId?: string): Promise<boolean>;
}
