import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { pool } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import healthRoutes from './routes/health';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Security middleware
app.use(helmet());

// CORS configuration for React Native
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            // In development, allow all origins
            if (process.env.NODE_ENV === 'development') {
                return callback(null, true);
            }

            // In production, check against allowed origins
            if (CORS_ORIGIN === '*') {
                return callback(null, true);
            }

            const allowedOrigins = CORS_ORIGIN.split(',').map(origin => origin.trim());
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/health', healthRoutes);
app.use('/api', apiRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

const testDatabaseConnection = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        console.log('✅ Database connected successfully at:', result.rows[0].now);
        client.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        console.error('💡 Make sure PostgreSQL is running and environment variables are set correctly');
        // Don't exit in development, but log the error
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

const startServer = async (): Promise<void> => {
    try {
        // Test database connection
        await testDatabaseConnection();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 CORS enabled for: ${CORS_ORIGIN}`);
            console.log(`📱 React Native app ready!`);
            console.log(`🗄️  Database: ${process.env.DB_NAME || 'pill_pall'}`);
        });
    } catch (error) {
        console.error('💥 Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app; 