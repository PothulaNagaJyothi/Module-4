# Node.js Architecture

Node.js is built to handle a large number of concurrent operations using a **single-threaded, non-blocking** model. Instead of creating a new thread for every request, it relies on asynchronous execution and an event-driven design to stay fast and efficient.

At a high level, Node.js consists of:

- JavaScript Engine (V8)
- Node.js Core APIs
- Native Bindings
- Event Loop
- libuv

---

## JavaScript Engine (V8)

- V8 is the JavaScript engine developed by Google.
- It converts JavaScript code directly into machine code.
- This removes interpretation overhead and improves performance.

**Role in Node.js**
- Executes JavaScript written by developers.
- Manages memory using garbage collection.
- Knows nothing about files, networks, or timers.

V8 only runs JavaScript. Everything else is handled outside it.

---

## Node.js Core APIs

- These are built-in modules provided by Node.js.
- Examples include `fs`, `http`, `path`, `crypto`, and `events`.

**Purpose**
- Expose system-level features to JavaScript.
- Provide asynchronous interfaces to avoid blocking.
- Internally rely on native C/C++ implementations.

Core APIs act as the public interface of Node.js.

---

## Native Bindings

- Native bindings connect JavaScript code to low-level C/C++ code.
- They use Node’s internal binding mechanism.

**Why they exist**
- JavaScript cannot directly access OS-level features.
- Native code is faster and more efficient for system tasks.

When you call an API like `fs.readFile`, JavaScript triggers native code through bindings.

---

## Event Loop

- The event loop controls execution order in Node.js.
- It continuously checks for completed tasks and executes their callbacks.

**Key points**
- Runs on the main thread.
- Never blocks while waiting for I/O.
- Enables Node.js to scale efficiently.

The event loop is the backbone of Node.js concurrency.

---

## libuv

### What is libuv?

- libuv is a C library used internally by Node.js.
- It provides asynchronous I/O and event handling.
- Works consistently across operating systems.

---

### Why Node.js needs libuv

- Different operating systems handle async I/O differently.
- JavaScript cannot manage threads or low-level OS operations.
- Node.js needs a uniform async layer.

libuv fills this gap.

---

### Responsibilities of libuv

- Implements the event loop.
- Handles asynchronous file system operations.
- Manages networking (TCP, UDP, DNS).
- Maintains a thread pool.
- Handles timers and system signals.

Without libuv, Node.js would not be non-blocking.

---

## Thread Pool

### What is a thread pool?

- A collection of background threads.
- Used for tasks that cannot be handled asynchronously by the OS.
- Default size is 4 threads.

---

### Why Node.js uses a thread pool

- Some operations are blocking by nature.
- Running them on the main thread would freeze execution.
- The thread pool keeps the event loop free.

---

### Operations handled by the thread pool

- File system operations
- DNS lookups
- Cryptographic functions
- Compression and decompression

These tasks run in parallel and return results asynchronously.

---

## Worker Threads

### What are worker threads?

- Separate JavaScript threads.
- Each worker has its own event loop and V8 instance.
- Used for CPU-intensive tasks.

---

### Why are worker threads needed?

- The main thread must stay responsive.
- Heavy computation blocks the event loop.
- Worker threads enable parallel processing.

---

### Difference between thread pool and worker threads

| Aspect | Thread Pool | Worker Threads |
|------|------------|----------------|
| Purpose | Handle blocking I/O | Handle CPU-heavy JS |
| Code Type | Native C/C++ | JavaScript |
| Control | Managed internally | Managed by developer |
| Event Loop | Shared | Separate per worker |

---

## Event Loop Queues

Node.js uses queues to decide task execution order.

---

### Macro Task Queue

Contains tasks such as:
- `setTimeout`
- `setInterval`
- `setImmediate`
- I/O callbacks

These are processed in event loop phases.

---

### Micro Task Queue

Contains high-priority tasks:
- `Promise.then`
- `Promise.catch`
- `process.nextTick`

Executed immediately after the current execution stack.

---

### Execution Priority

1. Current JavaScript execution
2. Micro Task Queue
3. Macro Task Queue
4. Next event loop phase

Microtasks always execute before macrotasks.

---

### Examples

**Micro Tasks**
- Promise callbacks
- `process.nextTick`

**Macro Tasks**
- Timers
- I/O callbacks
- `setImmediate`

---

