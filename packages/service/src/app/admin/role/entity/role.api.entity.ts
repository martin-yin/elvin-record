import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'role-api',
})
export class RoleApiEntity {
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
