import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdhibitionDto } from './dtos/create-adhibition.dto';
import { AdhibitionEntity } from './entity/adhibition.entity';

@Injectable()
export class AdhibitionService extends DataBaseService<AdhibitionEntity> {
  constructor(
    @InjectRepository(AdhibitionEntity)
    private adhibitioRepository: Repository<AdhibitionEntity>,
  ) {
    super(adhibitioRepository);
  }

  /**
   * 创建应用
   * @param createAdhibitionDto
   */
  async create(
    createAdhibitionDto: CreateAdhibitionDto,
  ): Promise<Partial<AdhibitionEntity>> {
    const adhibition: Partial<AdhibitionEntity> =
      await this.adhibitioRepository.save<AdhibitionEntity>(
        this.adhibitioRepository.create(createAdhibitionDto),
      );

    return adhibition;
  }

  /**
   * 获取所有应用
   */
  async getAll({
    name,
    status,
  }: {
    name: string;
    status: number;
  }): Promise<Result> {
    const adhibitionList = await this.adhibitioRepository.find({
      where: { name, status },
    });
    if (adhibitionList) return success('获取所有应用成功', adhibitionList);
  }

  /**
   * 获取单个用户
   */
  async getOne(id: number): Promise<Result> {
    const adhibitio = await this.findOne(id);

    if (adhibitio) {
      return success('获取应用成功', adhibitio);
    } else {
      throw new ApiException(`获取失败，ID 为 '${id}' 的应用不存在`, 404);
    }
  }
}
