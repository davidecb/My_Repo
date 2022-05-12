import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProducts(createProductDTO);
    res.status(HttpStatus.CREATED).json({
      message: 'product created',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productId')
  async getProduct(@Res() res, @Param('productId') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('product not founded');
    res.status(HttpStatus.OK).json(product);
  }
}
