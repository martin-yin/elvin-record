import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'role-menu',
})
export class RoleMenuEntity {
  @Column()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column()
  roleId: number;

  @Column()
  menuId: number;
}
