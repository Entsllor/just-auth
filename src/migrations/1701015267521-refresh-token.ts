import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshToken1701015267521 implements MigrationInterface {
    name = 'RefreshToken1701015267521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "just_auth"."refresh_token" ("body" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "authorIp" character varying NOT NULL, "userAgent" character varying NOT NULL, "revokedAt" TIMESTAMP WITH TIME ZONE, "userId" uuid, CONSTRAINT "PK_7c3b24b916368b2ae91fc510084" PRIMARY KEY ("body"))`);
        await queryRunner.query(`ALTER TABLE "just_auth"."refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "just_auth"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "just_auth"."refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`DROP TABLE "just_auth"."refresh_token"`);
    }

}
