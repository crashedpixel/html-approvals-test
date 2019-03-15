declare global {
    namespace jest {
        interface Matchers<R> {
            checkHTMLApproval: () => void;
        }
    }
}
interface Config {
    path: string;
}
export declare function init(config?: Config): void;
export {};
