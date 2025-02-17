export class ProductCategory {
    id: string;
    name: string;
    description: string;
    isActive: boolean;

    constructor(id: string, name: string, description: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
    }
}
