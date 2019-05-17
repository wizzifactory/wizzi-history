type cb<T> = (err: any, result: T) => void;

interface GitOptions {
    storeName: string;
}

interface GitResult {
    git: any;
    fs: any;
}

export function fsGit(options: GitOptions, callback: cb<any>): void;