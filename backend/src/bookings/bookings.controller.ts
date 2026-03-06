import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { BookingsService } from "./bookings.service";

@Controller("bookings")
export class BookingsController {
  constructor(private service: BookingsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body); 
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post("approve/:id")
  approve(@Param("id") id: number) {
    return this.service.approve(Number(id));
  }

  // ⭐ UPDATE BOOKING
  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  // ⭐ DELETE BOOKING
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.service.delete(Number(id));
  }
}