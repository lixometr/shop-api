import { Product, Promocode, ProductBo, PromocodeBo, CartProductDto, PromocodeTypes } from "src/internal";

export class CartBo {
    private products: CartProductDto[];
    private promocode?: Promocode
    constructor({ products, promocode }: { products: CartProductDto[], promocode?: Promocode }) {
        this.products = products
        this.promocode = promocode
    }
    getProductsBo() {
        return this.products.map(product => new ProductBo(product))
    }
    getPromocodeBo() {
        if (!this.promocode) return null
        return new PromocodeBo({ promocode: this.promocode })
    }
    getProductsPrice() {
        const products = this.getProductsBo()
        return products.reduce((sum, product) => {
            return sum + product.getTotalPrice()
        }, 0)
    }
    getPromocodeSale(): number {
        if (!this.promocode) return 0
        return this.getPromocodeBo().getSale()
    }
    getTotalPrice() {
        const productsPrice = this.getProductsPrice()
        const promocodeBo = this.getPromocodeBo()
        let totalPrice = productsPrice
        if (promocodeBo) {
            totalPrice = promocodeBo.apply(totalPrice)
        }
        return totalPrice
    }
}