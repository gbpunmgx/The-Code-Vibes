export class ProductModel {
    id: string;
    name: string;
    description: string;
    price: number;
    active: boolean;
    categoryId: string;
    images: string[];

    constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        active: boolean,
        categoryId: string,
        images: string[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.active = active;
        this.categoryId = categoryId;
        this.images = images;
    }
}
