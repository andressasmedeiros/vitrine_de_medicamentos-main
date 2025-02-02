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
        const table = await queryRunner.getTable('medicamentos');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('userId'));
        if (foreignKey) {
            await queryRunner.dropForeignKey('medicamentos', foreignKey);
        }

        await queryRunner.dropTable('medicamentos');
        await queryRunner.dropTable('users');
    }
}
