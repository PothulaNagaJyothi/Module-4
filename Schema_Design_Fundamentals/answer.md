# Schema Design Fundamentals – Theory

## 1. What is Schema Design?
**Schema design** is the process of defining the structure, organization, and relationships of data within a database. It acts as the architectural blueprint for our data. 

A **database schema** represents the logical configuration of the entire database. It defines the tables, the specific fields (columns), the data types allowed, and the constraints that govern how data interacts.

---

## 2. Why we Design the Schema Before Writing Backend Code?
In modern development, the database is the "source of truth." Designing the schema first is essential because:
* **Logic Dependencies:** Backend logic (controllers and services) is built to interact with specific table structures. If the structure changes later, the code breaks.
* **Refactoring Costs:** Changing a schema after code is written is expensive and risky. It often requires migrating existing data and rewriting complex queries.
* **Consistency:** It ensures the entire team agrees on what data is being collected before any "plumbing" is installed.

---

## 3. Impact of Poor Schema Design
* **Data Consistency:** Poor design allows for duplicate or "orphaned" data (e.g., an order linked to a user that doesn't exist).
* **Maintenance:** If data is scattered inefficiently, a simple update (like a user changing an email) might require updates in multiple tables, increasing the chance of errors.
* **Scalability:** As the database grows, poor indexing or bloated tables will cause query speeds to drop significantly, leading to a slow user experience.

---


## 4. Validations in Schema Design
Validations are rules the database enforces to maintain **Data Integrity**.
* **PRIMARY KEY:** Uniquely identifies each record (e.g., `user_id`).
* **NOT NULL:** Ensures a field cannot be left empty (e.g., every user must have an `email`).
* **UNIQUE:** Prevents duplicate entries (e.g., no two users can have the same `phone_number`).
* **DEFAULT:** Sets a value if none is provided (e.g., `is_active` defaults to `true`).

---

## 5. Database Schema vs. Database Table
* **Database Schema:** The overall container and layout of the entire database system.
* **Database Table:** A specific object within the schema that holds data about a single entity, organized into rows and columns.

---

## 6. Single Entity Representation
Each table should represent only **one entity** (e.g., a `Users` table should not also store `Order` details). 
* **Why?** Mixing entities creates massive data redundancy and makes it impossible to update one without affecting the other.

---

## 7. Avoiding Redundant or Derived Data
* **Redundant Data:** Storing the same information (like a category name) in ten different places. If the name changes, we have to find all ten spots. 
* **Derived Data:** Data that can be calculated. You should store `date_of_birth` rather than `age`, because `age` changes every year while the birth date is a static fact.

---

## 8. Correct Data Types
Choosing the right data type (e.g., `INT`, `VARCHAR`, `BOOLEAN`) is vital for:
* **Efficiency:** Using the smallest necessary data type saves disk space and memory.
* **Calculations:** We cannot perform mathematical operations on a "Date" if it is stored as a "String."
* **Accuracy:** Proper types prevent "garbage data" (like text being entered into a price column).