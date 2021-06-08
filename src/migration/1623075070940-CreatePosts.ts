import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreatePosts1623075070940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       return await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment',isPrimary:true},
                {name: 'username',type: 'varchar'},
                {name: 'password_digest',type: 'varchar'},
                {name: 'author_id',type: 'int'},
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       return await queryRunner.dropTable('posts')
    }

}
