declare module '*.png' {
    const src: string[]
    export default src
}

declare module '*.svg' {
    const src: string;
    export default src;
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_API_KEY: string
    readonly VITE_API_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}