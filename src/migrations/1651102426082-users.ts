import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1651102426082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'uid',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar(20)',
          },
          {
            name: 'password',
            type: 'varchar(50)',
          },
          {
            name: 'email',
            type: 'varchar(30)',
          },
          {
            name: 'phone_number',
            type: 'varchar(20)',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
