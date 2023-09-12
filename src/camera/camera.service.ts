import { Injectable } from '@nestjs/common';
import { Cameras } from './camera.interface';

@Injectable()
export class CameraService {
    constructor(
        private camearas: Cameras[] = []
    ) {}

    createCamera(cameara: Cameras) {
        this.camearas.push(cameara)
    }

    showAll(): Cameras[] {
        return this.camearas;
    }
}
