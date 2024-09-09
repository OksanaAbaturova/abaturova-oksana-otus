import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11725789712494 implements MigrationInterface {
    name = 'Migration11725789712494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_users" DROP CONSTRAINT "fk_usertask_user"`);
        await queryRunner.query(`ALTER TABLE "tasks_users" DROP CONSTRAINT "fk_usertask_task"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "task_level_check"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "user_role_check"`);
        await queryRunner.query(`COMMENT ON TABLE "tasks" IS NULL`);
        await queryRunner.query(`COMMENT ON TABLE "tasks_users" IS NULL`);
        await queryRunner.query(`COMMENT ON TABLE "users" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."id" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."title" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."description" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."tags" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "complexityLevel"`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_complexitylevel_enum" AS ENUM('Easy', 'Medium', 'Hard')`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "complexityLevel" "public"."tasks_complexitylevel_enum" NOT NULL DEFAULT 'Easy'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."userid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."taskid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."decision" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."isdone" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."updated" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks_users" ALTER COLUMN "updated" SET DEFAULT '"2024-09-08T10:01:55.643Z"'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."name" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks_users" ADD CONSTRAINT "FK_135fd06f6284053e370a99ab9b7" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_users" ADD CONSTRAINT "FK_63c01089281ab0a4ba63beb1eda" FOREIGN KEY ("taskid") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_users" DROP CONSTRAINT "FK_63c01089281ab0a4ba63beb1eda"`);
        await queryRunner.query(`ALTER TABLE "tasks_users" DROP CONSTRAINT "FK_135fd06f6284053e370a99ab9b7"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS 'Одна из допустимых типов ролей: админ - Admin, User - простой пользователь, Interviewer - интервьюер'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS 'Эл. почта'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS 'Пароль'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."name" IS 'имя - логин для входа'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS 'ИД пользователя'`);
        await queryRunner.query(`ALTER TABLE "tasks_users" ALTER COLUMN "updated" SET DEFAULT CURRENT_DATE`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."updated" IS 'Последняя дата обновления работы пользователя по задаче'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."isdone" IS '(признак) Решена пользователем задача или нет'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."decision" IS 'Решение'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."taskid" IS 'ИД задачи'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks_users"."userid" IS 'ИД пользователя'`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "complexityLevel"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_complexitylevel_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "complexityLevel" character varying(6) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."tags" IS 'Список выражений/слов, применимых в качестве тегов для поиска (разделенных символом ~)'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."description" IS 'Описание'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."title" IS 'Заголовок'`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."id" IS 'ИД задачи'`);
        await queryRunner.query(`COMMENT ON TABLE "users" IS 'Пользователи'`);
        await queryRunner.query(`COMMENT ON TABLE "tasks_users" IS 'Задачи пользователя'`);
        await queryRunner.query(`COMMENT ON TABLE "tasks" IS 'Задачи'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "user_role_check" CHECK (((role)::text = ANY ((ARRAY['Admin'::character varying, 'User'::character varying, 'Interviewer'::character varying])::text[])))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "task_level_check" CHECK ((("complexityLevel")::text = ANY (ARRAY[('Easy'::character varying)::text, ('Medium'::character varying)::text, ('Hard'::character varying)::text])))`);
        await queryRunner.query(`ALTER TABLE "tasks_users" ADD CONSTRAINT "fk_usertask_task" FOREIGN KEY ("taskid") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_users" ADD CONSTRAINT "fk_usertask_user" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
