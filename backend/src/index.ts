import Fastify from "fastify";
import dotenv from "dotenv";
import "@fastify/postgres"; // Import plugin types for augmentation
import cors from "@fastify/cors";
import postgres from "@fastify/postgres"; // Add this import

const fastify = Fastify({
  logger: true,
});

// Load environment variables first
dotenv.config();

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: "*", // Allow all origins for development, adjust as needed for production
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    });

    // Register PostgreSQL plugin
    await fastify.register(postgres, {
      connectionString:
        process.env.DATABASE_URL ||
        "postgresql://user:password@localhost:5432/crud_db",
    });

    fastify.get("/users", (_request, reply) => {
      fastify.pg.query("SELECT * FROM users", (err, result) => {
        if (err) {
          fastify.log.error(err);
          reply.status(500).send("Database query error");
        } else {
          reply.send(result.rows);
        }
      });
    });

    fastify.post("/users", async (request, reply) => {
      const { name, email } = request.body;
      fastify.pg.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email],
        (error, result) => {
          if (error) {
            if (error.code === "23505") {
              // Unique violation error code
              fastify.log.error("Email already exists:", error);
              reply.status(400).send("Email already exists");
            } else {
              fastify.log.error(error);
              reply.status(500).send("Database query error");
            }
          } else {
            reply.status(201).send(result.rows[0]);
          }
        }
      );
    });

    const port = parseInt(process.env.PORT || "3000");
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ port, host });
    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

await start();
