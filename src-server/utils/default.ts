interface ApiConfig {
    baseURL: string;
    username: string;
    password: string;
}

interface LocalConfig {
    baseURL: string;
    port: number;
    version: string;
}

interface Config {
    local: LocalConfig,
    api: ApiConfig;
    debug: boolean;
}

const config: Config = {
    api: {
        baseURL: 'https://drive.topupbackup.com',
        username: 'cee47ec8-4ae7-46dc-b131-dc00eb43d02e',
        password: 'eG2ZA4Jr#c}y(FED{N8_fS'
    },
    local: {
        baseURL: 'http://localhost:5000',
        port: 5000,
        version: '1.1'
    },
    debug: true
};

export default config;