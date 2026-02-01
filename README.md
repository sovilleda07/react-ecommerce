# React E-commerce Application

A sleek, functional e-commerce application built with **React** and **Vite**. This project focuses on simulating a complete online shopping experience, from product browsing to order tracking, with custom services for state management and data persistence.

![Demo](./public/demo.png)

## Features

*   **Product Browsing**: Explore a dynamic catalog of products fetched from the [Fake Store API](https://fakestoreapi.com/), featuring real-time data loading.
*   **Smart Shopping Cart**:
    *   Add items with adjustable quantities.
    *   Update quantities or remove items directly within the cart.
    *   Automatic price calculation including shipping costs and tax.
*   **Checkout Flow**:
    *   Choose from multiple delivery options (Standard, Express, Next Day) with varying costs and speeds.
    *   See accurate estimated delivery dates based on your selection.
    *   Review a comprehensive payment summary before placing your order.
*   **Order Management**:
    *   **Order History**: View all your past orders in one place.
    *   **Order Tracking**: Visualize the status of your order ("Preparing", "Shipped", "Delivered") with a dynamic progress bar.
*   **Data Persistence**: Your cart and order history are saved automatically using `localStorage`, so you never lose your progress even after refreshing the page.
*   **Client-Side Filtering**: Instantly search for products by name or keywords.

## Tech Stack

*   **Framework**: [React](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: JavaScript (ES6+)
*   **Styling**: Custom CSS3, Responsive Design
*   **Data Source**: Fake Store API (products)
*   **State Management**: Custom Service Layer (`cartService`, `orderService`) with Async/Await
*   **Testing**: [Vitest](https://vitest.dev/), React Testing Library
*   **Routing**: [React Router](https://reactrouter.com/)

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sovilleda07/react-ecommerce.git
    cd react-ecommerce
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173`.

4.  **Run Tests**:
    ```bash
    npx vitest run
    ```
