import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { GateModule } from 'src/gate/gate.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
    imports: [ 
        GateModule,
        TransactionModule
     ],
    controllers: [CameraController],
    providers: [CameraService],
    exports: [CameraService]
})
export class CameraModule {}
