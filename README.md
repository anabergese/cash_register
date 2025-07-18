## 🧾 Cash Register App

### 🛍️ Overview

This project is a **Cash Register web application** where users can:

1. Browse available products
2. Build an order by selecting quantities
3. Submit the order to the backend
4. View a shopping cart summary with discounts applied automatically

---

### 🧱 Project Structure

```
/cash_register
├── app/        # Rails App (API)
│   ├── assets/images/
│   └── ...
├── frontend/       # React App
│   ├── src/
│   ├── public/
│   └── package.json
```

---

### 🚀 How to Run the App

#### 1️⃣ Backend (Rails API)

```bash
cd cash_register
bin/rails server
```

This starts the backend at `http://localhost:3000`.

---

#### 2️⃣ Frontend (React)

```bash
cd cash_register/frontend
npm install
npm start
```

This starts the React app at `http://localhost:3001`.
Thanks to the `"proxy"` setting in `package.json`, API requests automatically redirect to Rails on port `3000`.

---

### 🔄 Event Flow Summary

| Stage               | UI View                                       | Backend Role                         |
| ------------------- | --------------------------------------------- | ------------------------------------ |
| 🛒 Product browsing | Product list and quantity inputs              | `GET /products.json`                 |
| ➕ Add to cart       | Quantity form and live total update           | `POST /cart_items` creates new cart  |
| 📦 View cart        | Shopping cart summary                         | `GET /carts/:id.json` with discounts |
| 🎉 Discounts shown  | Each item shows discount message (if applied) | Calculated in `Checkout` service     |

---

### 📦 Discount Logic

All discounts are applied on the **backend only**, via the `Checkout` service. Current rules include:

* `GR1`: Buy-One-Get-One-Free (Green Tea)
* `SR1`: 3+ units → €4.50 each (Strawberries)
* `CF1`: 3+ units → 2/3 price per unit (Coffee)

---

### 🧪 Testing

#### ✅ Frontend (React)

* Uses **Jest** and **Testing Library**:

```bash
cd frontend
npm test
```

#### ✅ Backend (Rails - Minitest)

* Runs with built-in **Minitest**:

```bash
bin/rails test
```

* Uses `test_helper.rb` for global configuration
* Test files live in `test/models`, `test/integration`.

---

### 📋 Future Enhancements

* User authentication
* Stock management of products
* Persisting cart across sessions
* Return message of the discount applied to the user

---
