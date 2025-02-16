import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class VitrineMedicamentosSemana071738471707820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '150',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    }
                ]
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'permissions',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'medicamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '150',
                        isNullable: false
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'quantidade',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    {
                        name: 'userId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isPrimary: true
                    }
                ]
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'permission_role',
                columns: [
                    {
                        name: 'permissionId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isPrimary: true
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            'medicamentos',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE' 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('permission_role');
        await queryRunner.dropTable('user_roles');
        await queryRunner.dropTable('permissions');
        await queryRunner.dropTable('roles');
        await queryRunner.dropTable('medicamentos');
        await queryRunner.dropTable('users');
    }
}
