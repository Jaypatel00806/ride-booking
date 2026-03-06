import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  create(data: any) {
    return this.bookingRepo.save(data);
  }

  findAll() {
    return this.bookingRepo.find({
      order: { id: "DESC" },
    });
  }

  async approve(id: number) {
    await this.bookingRepo.update(id, {
      status: "Approved",
    });

    return this.bookingRepo.findOne({
      where: { id },
    });
  }

  // ⭐ NEW UPDATE METHOD
  async update(id: number, data: any) {
    await this.bookingRepo.update(id, data);

    return this.bookingRepo.findOne({
      where: { id },
    });
  }

  // ⭐ NEW DELETE METHOD
  async delete(id: number) {
    return this.bookingRepo.delete(id);
  }
}