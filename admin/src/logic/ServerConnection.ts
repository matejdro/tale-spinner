declare var SERVER_IP: string;

export function getServerIp(): string {
    try {
        return SERVER_IP;
    } catch (e) {
        return "127.0.0.1";
    }
}
