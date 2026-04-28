const axios = require('axios');

const docs = [
  // Topic 1: SQL vs NoSQL
  {
    title: "SQL Databases Overview",
    topic: "Databases",
    content: "SQL databases are relational and use structured query language. They are best for complex queries and transactional consistency (ACID). Common examples include PostgreSQL, MySQL, and SQL Server. They use fixed schemas and are vertically scalable."
  },
  {
    title: "NoSQL Databases Benefits",
    topic: "Databases",
    content: "NoSQL databases are non-relational and offer flexible schemas (Document, Key-Value, Graph). They are designed for high-volume data and horizontal scaling. Examples include MongoDB and Cassandra. However, NoSQL databases often sacrifice ACID consistency for performance (BASE)."
  },
  
  // Topic 2: REST API vs GraphQL
  {
    title: "REST API Fundamentals",
    topic: "Web Development",
    content: "REST (Representational State Transfer) is an architectural style using standard HTTP methods like GET, POST, PUT, DELETE. It works with resources and often suffers from over-fetching or under-fetching of data. It is stateless and widely adopted."
  },
  {
    title: "GraphQL Advantages",
    topic: "Web Development",
    content: "GraphQL is a query language for APIs that allows clients to request exactly the data they need. It uses a single endpoint and prevents over-fetching. While powerful, it can be complex to implement and lacks built-in caching compared to REST."
  },

  // Topic 3: Monolithic vs Microservices
  {
    title: "Monolithic Architecture",
    topic: "Architecture",
    content: "A monolithic architecture is a single, unified unit for a software application. It is easy to develop, test, and deploy initially. However, as the app grows, it becomes difficult to maintain, scale, and update specific parts without affecting the whole system."
  },
  {
    title: "Microservices Architecture",
    topic: "Architecture",
    content: "Microservices break an application into small, independent services that communicate via APIs. This allows for better scalability and independent deployments. The trade-off is increased complexity in network communication and data consistency."
  },

  // Topic 4: SSR vs CSR
  {
    title: "Server-Side Rendering (SSR)",
    topic: "Web Rendering",
    content: "SSR generates the full HTML on the server for every request. This is great for SEO and faster initial page loads on slow devices. Frameworks like Next.js make SSR easy, but it can put more load on the server."
  },
  {
    title: "Client-Side Rendering (CSR)",
    topic: "Web Rendering",
    content: "CSR downloads a minimal HTML file and lets JavaScript handle the rendering in the browser. It provides a highly interactive user experience like a desktop app. However, CSR can be slower for the first load and harder for search engines to crawl."
  },

  // Topic 5: WebSockets vs HTTP Polling
  {
    title: "HTTP Polling Basics",
    topic: "Real-time Communication",
    content: "HTTP Polling involves the client repeatedly asking the server for updates. Long polling is a more efficient version where the server holds the request until data is available. It is simple but can cause high latency and overhead."
  },
  {
    title: "WebSockets for Real-time",
    topic: "Real-time Communication",
    content: "WebSockets provide a full-duplex, persistent connection between client and server. This is ideal for chats and live notifications. It has much lower overhead than polling but requires a server that can handle many concurrent connections."
  }
];

async function seed() {
  console.log('🚀 Starting Seeding Process...');
  for (const doc of docs) {
    try {
      await axios.post('http://localhost:3001/upload', doc);
      console.log(`✅ Uploaded: ${doc.title}`);
    } catch (error) {
      console.error(`❌ Failed: ${doc.title} - ${error.message}`);
    }
  }
  console.log('✨ Seeding Completed!');
}

seed();
