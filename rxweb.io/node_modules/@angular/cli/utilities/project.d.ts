export declare function insideProject(): boolean;
export interface ProjectDetails {
    root: string;
    configFile?: string;
}
export declare function getProjectDetails(): ProjectDetails | null;
