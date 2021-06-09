import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUsers1623243298688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await  queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment',isPrimary:true},
                {name: 'username',type: 'varchar'},
                {name: 'passwordDigest',type: 'varchar'},
                {name: 'CreateAt', type: 'timestamp', isNullable: false, default: 'now()'},
                {name: 'UpdateAt', type: 'timestamp', isNullable: false, default: 'now()'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('users')
    }

}
