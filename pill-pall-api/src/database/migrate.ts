import { pool } from '../config/database';
import { readFileSync } from 'fs';
import { join } from 'path';

const runMigrations = async (): Promise<void> => {
    try {
        console.log('🚀 Starting database migrations...');

        // Read the migration file
        const migrationPath = join(__dirname, 'migrations', '001_create_schema.sql');
        const migrationSQL = readFileSync(migrationPath, 'utf8');

        // Execute the migration
        await pool.query(migrationSQL);

        console.log('✅ Database migrations completed successfully!');
        console.log('📊 Created tables:');
        console.log('  - users');
        console.log('  - medications');
        console.log('  - user_medications');
        console.log('  - reminders');
        console.log('  - pill_confirmations');
        console.log('  - pain_records');
        console.log('  - diary_entries');
        console.log('  - side_effects');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
};

// Run migrations if this file is executed directly
if (require.main === module) {
    runMigrations()
        .then(() => {
            console.log('🎉 Database setup complete!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Migration error:', error);
            process.exit(1);
        });
}

export { runMigrations }; 