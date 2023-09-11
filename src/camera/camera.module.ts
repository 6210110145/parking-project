import { Module } from '@nestjs/common';
import { LicensePlateController } from './camera.controller';
import { LicensePlateService } from './camera.service';

@Module({
    imports: [],
    controllers: [LicensePlateController],
    providers: [LicensePlateService]
})
export class LicensePlateModule {}
