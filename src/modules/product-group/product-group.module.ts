import { Module } from "@nestjs/common";
import { AttributeValueModule } from "./attribute-value/attribute-value.module";
import { AttributeModule } from "./attribute/attribute.module";
import { ProductAttributeModule } from "./product-attribute/product-attribute.module";
import { ProductCategoryModule } from "./product-category/product-category.module";
import { ProductTagModule } from "./product-tag/product-tag.module";
import { ProductModule } from "./product/product.module";

@Module({
    imports: [ProductModule, AttributeModule, AttributeValueModule, ProductAttributeModule, ProductCategoryModule, ProductTagModule]
})

export class ProductGroupModule {}
