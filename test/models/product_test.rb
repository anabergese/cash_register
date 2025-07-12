require "test_helper"

class ProductTest < ActiveSupport::TestCase
  def setup
    @tea = products(:tea) # fixture
  end

  test "fixture product is valid" do
    assert @tea.valid?
  end

  test "fails to save when code is missing" do
    product = Product.new(name: "Test Product", price_cents: 100)
    assert_not product.valid?
    assert_includes product.errors[:code], "can't be blank"
  end

  test "fails to save when name is missing" do
    product = Product.new(code: "P001", price_cents: 100)
    assert_not product.valid?
    assert_includes product.errors[:name], "can't be blank"
  end

  test "fails to save when price_cents is missing" do
    product = Product.new(code: "P002", name: "Test Product")
    assert_not product.valid?
    assert_includes product.errors[:price_cents], "can't be blank"
  end

  test "fails to save when code is not unique" do
    duplicate = Product.new(code: @tea.code, name: "Duplicate", price_cents: 150)
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:code], "has already been taken"
  end

  test "fails to save when price_cents is not an integer" do
    product = Product.new(code: "P003", name: "Test", price_cents: "abc")
    assert_not product.valid?
    assert_includes product.errors[:price_cents], "is not a number"
  end

  test "fails to save when price_cents is less than or equal to zero" do
    product = Product.new(code: "P004", name: "Test", price_cents: 0)
    assert_not product.valid?

    product.price_cents = -10
    assert_not product.valid?
  end
end
