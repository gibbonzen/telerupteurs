import { Injectable } from '@angular/core';

export class Config {
    readonly BASE_URL: string
}

export class AppConfig extends Config {
    readonly BASE_URL = 'BASE_URL'
}