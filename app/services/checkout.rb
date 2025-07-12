class Checkout
    def initialize(products:)
        @products = products
    end

    def total_price_cents
        grouped_items = @products.group_by(&:code).transform_values(&:count)

        grouped_items.sum do |code, count|
        product = @products.find { |p| p.code == code }
        apply_discount(product, count)
        end
    end

    private

    def apply_discount(product, count)
        case product.code
        when "GR1" # Buy-one-get-one-free
        (count / 2 + count % 2) * product.price_cents
        when "SR1" # 3 or more Strawberries = 4.50 each
        price = count >= 3 ? 450 : product.price_cents
        count * price
        when "CF1" # 3 or more Coffees = 2/3 price
        price = count >= 3 ? (product.price_cents * 2 / 3.0).round : product.price_cents
        count * price
        else
        count * product.price_cents
        end
    end
end
