
import Fastify from 'fastify'
import dotenv from 'dotenv';
import '@fastify/postgres'; // Import plugin types for augmentation

const fastify = Fastify({
  logger: true
})

// Load environment variables
dotenv.config();

// Register PostgreSQL plugin
fastify.register(require('@fastify/postgres'), {
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/crud_db'
});

fastify.get('/users', (_request, reply) => {
  fastify.pg.query('SELECT * FROM users', (err, result) => {
    if (err) {
      fastify.log.error(err);
      reply.status(500).send('Database query error');
    } else {
      reply.send(result.rows);
    }
  });
})

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();