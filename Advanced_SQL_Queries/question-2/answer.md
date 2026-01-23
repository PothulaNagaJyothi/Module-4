# Database Relationships

## Definition
A **database relationship** is a logical connection between two tables in a relational database.  
It allows data to be shared and linked across tables using keys:

- **Primary Key (PK):** A unique identifier for each record in a table.  
- **Foreign Key (FK):** A column in one table that refers to the Primary Key in another table.  

This structure ensures data integrity, reduces redundancy, and makes queries more efficient.

---

## Types of Relationships in E-commerce

### 1. One-to-One (1:1)
- **Definition:** One record in Table A relates to exactly one record in Table B.  
- **E-commerce Example:** A **User** and their **Account Settings**.  
- **Logic:** One user has only one set of account settings (like theme preference or notification toggles), and those settings belong only to that user.  

**Diagram:**
```text
User (PK: user_id) ──── 1:1 ──── Account_Settings (FK: user_id)

---

### 2. One-to-Many (1:N)
- **Definition:** One record in Table A can relate to many records in Table B.  
- **E-commerce Example:** **Customers** and **Orders**.  
- **Logic:** One Customer can place many Orders over time. However, each specific Order is linked to only one Customer.  
- **Implementation:** The **Orders** table will have a `customer_id` column as a Foreign Key.

**Diagram:**
```text
Customer (PK: customer_id)
   │
   └───< Order (FK: customer_id)

---

### 3. Many-to-Many (N:M)
- **Definition:** Many records in Table A relate to many records in Table B.  
- **E-commerce Example:** **Orders** and **Products**.  
- **Logic:** One Order can contain many Products. At the same time, one Product can be part of many different Orders.  
- **Junction Table:** We create a table called **Order_Items** that links `order_id` and `product_id`.

**Diagram:**
```text 
Order (PK: order_id) ───< Order_Items (FK: order_id, product_id) >─── Product (PK: product_id)

---


