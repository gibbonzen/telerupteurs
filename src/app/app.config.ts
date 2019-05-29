import { Injectable } from '@angular/core';

export class Config {
    readonly BASE_URL: string
    readonly TELERUPTEURS_URL: string
    readonly SOCKET_URL: string
}

export class AppConfig extends Config {
    readonly BASE_URL = 'BASE_URL'
    readonly TELERUPTEURS_URL = 'TELERUPTEURS_URL'
    readonly SOCKET_URL = 'SOCKET_URL'
}