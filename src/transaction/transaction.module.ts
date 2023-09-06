import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Transaction ])],
  exports: [ TransactionService ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
