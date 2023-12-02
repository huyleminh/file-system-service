export interface IGenericRepository<T> {
    getRecordById(id: number): Promise<T | null>;
    getManyRecord(limit: number, offset: number): Promise<T[]>;
    saveRecord(entity: Partial<T>): Promise<T>;
    updateRecordById(id: number, entity: Partial<T>): Promise<any>;
    deleteRecordById(id: number): Promise<any>;
    executeRawQuery(query: string, parameters?: any[]): Promise<any>;
}
