import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumns1676365053461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('users', 'password_digest', 'passwordDigest');
        await queryRunner.renameColumn('posts', 'author_id', 'authorId');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('users', 'passwordDigest', 'password_digest');
        await queryRunner.renameColumn('posts', 'authorId', 'author_id');
    }

}
