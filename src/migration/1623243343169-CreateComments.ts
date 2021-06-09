import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1623243343169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'comments',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
                {name: 'userId', type: 'int'},
                {name: 'postId', type: 'int'},
                {name: 'content', type: 'text'},
                {name: 'CreateAt', type: 'timestamp', isNullable: false, default: 'now()'},
                {name: 'UpdateAt', type: 'timestamp', isNullable: false, default: 'now()'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('comments')
    }
}
