export class ProductModel {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(productData: any) {
        this.id = productData.id;
        this.name = productData.name;
        this.description = productData.description;
        this.price = productData.price;
        this.category = productData.category;
        this.createdAt = new Date(productData.createdAt);
        this.updatedAt = new Date(productData.updatedAt);
    }
}
