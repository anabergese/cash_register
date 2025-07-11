require "test_helper"

class ProductTest < ActiveSupport::TestCase
  def setup
    @valid_attributes = { code: "P001", name: "Test Product", price_cents: 100 }
  end

  # ✔️ Test with valid attributes
  test "saves product with valid attributes" do
    product = Product.new(@valid_attributes)
    assert product.save, "Product did not save with valid attributes"
    assert product.persisted?, "Product was not saved to the database"
    assert_equal "P001", product.code
    assert_equal "Test Product", product.name
    assert_equal 100, product.price_cents
  end

  # ❌ Validations: presence
  test "fails to save when code is missing" do
    product = Product.new(name: "Test Product", price_cents: 100)
    assert_not product.save, "Saved the product without a code"
  end

  test "fails to save when name is missing" do
    product = Product.new(code: "P001", price_cents: 100)
    assert_not product.save, "Saved the product without a name"
  end

  test "fails to save when price_cents is missing" do
    product = Product.new(code: "P002", name: "Test Product")
    assert_not product.save, "Saved the product without price_cents"
  end

  # ❌ Validations: uniqueness
  test "fails to save when code is not unique" do
    Product.create!(@valid_attributes)
    duplicate = Product.new(@valid_attributes.merge(name: "Another Product"))
    assert_not duplicate.save, "Saved the product with a duplicate code"
  end

  # ❌ Validations: data type and range
  test "fails to save when price_cents is not an integer" do
    product = Product.new(@valid_attributes.merge(price_cents: "abc"))
    assert_not product.save, "Saved the product with a non-integer price_cents"
  end

  test "fails to save when price_cents is less than or equal to zero" do
    product = Product.new(@valid_attributes.merge(price_cents: 0))
    assert_not product.save, "Saved the product with price_cents = 0"

    product.price_cents = -10
    assert_not product.save, "Saved the product with negative price_cents"
  end
end
