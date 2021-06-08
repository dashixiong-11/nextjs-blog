import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCreateAtAndUpdateAt1623159070352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({name: 'CreateAt', type: 'timestamp', isNullable: false, default: 'now()'}),
            new TableColumn({name: 'UpdateAt', type: 'timestamp', isNullable: false, default: 'now()'})
        ])
        await queryRunner.addColumns('comments', [
            new TableColumn({name: 'CreateAt', type: 'timestamp', isNullable: false, default: 'now()'}),
            new TableColumn({name: 'UpdateAt', type: 'timestamp', isNullable: false, default: 'now()'})
        ])
        return await queryRunner.addColumns('posts', [
            new TableColumn({name: 'CreateAt', type: 'timestamp', isNullable: false, default: 'now()'}),
            new TableColumn({name: 'UpdateAt', type: 'timestamp', isNullable: false, default: 'now()'})
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'createAt')
        await queryRunner.dropColumn('users', 'updateAt')
        await queryRunner.dropColumn('posts', 'createAt')
        await queryRunner.dropColumn('posts', 'updateAt')
        await queryRunner.dropColumn('comments', 'createAt')
        return await queryRunner.dropColumn('comments', 'updateAt')
    }

}
