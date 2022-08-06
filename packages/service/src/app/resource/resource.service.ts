import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ResourceEntity } from './entity/resource.entity';
import { ResourceGroupEntity } from './entity/resource.group.entity';
import { ResourceListDTO, UploadFilesDTO } from './resource.dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    @InjectRepository(ResourceEntity)
    private readonly resourceGroupRepository: Repository<ResourceGroupEntity>,
  ) {}

  async getFiles({ pageIndex, pageSize, groupId }: ResourceListDTO) {
    const where: FindOptionsWhere<ResourceEntity> = {
      group: groupId as any,
    };
    return this.resourceRepository.find({
      order: {
        id: 'ASC',
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
      where,
    });
  }

  /**
   * 获取资源分组列表
   * @param param0
   */
  async getGroupList({ pageIndex, pageSize }) {
    return this.resourceGroupRepository.findAndCount({
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
      order: {
        order: 'ASC',
      },
    });
  }

  async uploadFiles({ files }: UploadFilesDTO) {
    const filesData = files.map((file) =>
      this.resourceGroupRepository.create(file as any),
    ) as any;
    return await this.resourceGroupRepository.save(filesData);
  }
}
