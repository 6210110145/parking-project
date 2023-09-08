import { Module } from '@nestjs/common';
import { LicensePlateController } from './license_plate.controller';
import { LicensePlateService } from './license_plate.service';

@Module({
    imports: [],
    controllers: [LicensePlateController],
    providers: [LicensePlateService]
})
export class LicensePlateModule {}
