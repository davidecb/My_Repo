import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './intefaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID);
    return product;
  }

  async createProducts(createProductDTO: CreateProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(createProductDTO);
    return await createdProduct.save();
  }

  async updateProducts(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProducts(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }
}
