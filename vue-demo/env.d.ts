/// <reference types="vite/client" />

interface importMetaEnv {
  readonly VITE_APP_API_URL: string;
}

interface importMeta {
  readonly env: ImportMetaEnv;
}
