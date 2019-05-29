export interface SocketListener {
    connect(ws: string)
    onChange(next: Function)
}