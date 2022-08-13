import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'role-permission',
})
export class RolePermissionEntity {
  @Column()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column()
  roleId: number;

  @Column()
  permissionId: number;
}
