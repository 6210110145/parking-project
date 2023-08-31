import { Module } from '@nestjs/common';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { Gate } from './entities/gate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ Gate ])],
  controllers: [GateController],
  providers: [GateService],
})
export class GateModule {}
