import { pool } from '../config/database';

const seedDatabase = async (): Promise<void> => {
    try {
        console.log('🌱 Starting database seeding...');

        // Insert sample medications (from public API data)
        await pool.query(`
      INSERT INTO medications (ndc_code, name, generic_name, brand_name, manufacturer, dosage_form, strength, description, api_source, api_id) VALUES
      ('0093-0058-01', 'Ibuprofen', 'Ibuprofen', 'Advil', 'Teva Pharmaceuticals', 'tablet', '200mg', 'Nonsteroidal anti-inflammatory drug (NSAID)', 'fda', 'ibuprofen-200mg'),
      ('0172-2426-70', 'Acetaminophen', 'Acetaminophen', 'Tylenol', 'Johnson & Johnson', 'tablet', '500mg', 'Pain reliever and fever reducer', 'fda', 'acetaminophen-500mg'),
      ('0781-5092-31', 'Omeprazole', 'Omeprazole', 'Prilosec', 'Sandoz', 'capsule', '20mg', 'Proton pump inhibitor for acid reflux', 'fda', 'omeprazole-20mg'),
      ('61314-0020-1', 'Vitamin D3', 'Cholecalciferol', 'Nature Made Vitamin D3', 'Nature Made', 'softgel', '2000 IU', 'Vitamin D supplement', 'supplements', 'vitamin-d3-2000iu'),
      ('0054-0222-25', 'Lisinopril', 'Lisinopril', 'Zestril', 'Hikma Pharmaceuticals', 'tablet', '10mg', 'ACE inhibitor for blood pressure', 'fda', 'lisinopril-10mg')
      ON CONFLICT (ndc_code) DO NOTHING;
    `);

        // Insert a sample user
        await pool.query(`
      INSERT INTO users (email, name) VALUES
      ('demo@pillpall.com', 'Demo User')
      ON CONFLICT (email) DO NOTHING;
    `);

        // Get the user ID for further seeding
        const userResult = await pool.query('SELECT id FROM users WHERE email = $1', ['demo@pillpall.com']);
        const userId = userResult.rows[0]?.id;

        if (userId) {
            // Insert sample user medications
            await pool.query(`
        INSERT INTO user_medications (user_id, medication_id, dose, frequency, instructions, start_date, notes) VALUES
        ($1, (SELECT id FROM medications WHERE generic_name = 'Ibuprofen'), '1 tablet', 'As needed for pain', 'Take with food', CURRENT_DATE - INTERVAL '30 days', 'For back pain'),
        ($1, (SELECT id FROM medications WHERE generic_name = 'Cholecalciferol'), '1 softgel', 'Once daily', 'Take with breakfast', CURRENT_DATE - INTERVAL '60 days', 'Daily vitamin D supplement')
      `, [userId]);

            // Insert sample reminders
            const userMedResult = await pool.query('SELECT id FROM user_medications WHERE user_id = $1 LIMIT 2', [userId]);

            if (userMedResult.rows.length > 0) {
                await pool.query(`
          INSERT INTO reminders (user_medication_id, time, days_of_week, custom_message) VALUES
          ($1, '08:00:00', '{1,2,3,4,5,6,7}', 'Morning vitamin D with breakfast'),
          ($2, '12:00:00', '{1,2,3,4,5}', 'Ibuprofen if needed for pain')
        `, [userMedResult.rows[0].id, userMedResult.rows[1]?.id || userMedResult.rows[0].id]);
            }

            // Insert sample pain records
            await pool.query(`
        INSERT INTO pain_records (user_id, pain_level, location, pain_type, notes) VALUES
        ($1, 6, 'Lower back', 'dull', 'Pain worse in morning, better after stretching'),
        ($1, 4, 'Neck', 'sharp', 'Tension from computer work'),
        ($1, 3, 'Headache', 'throbbing', 'Stress-related headache')
      `, [userId]);

            // Insert sample diary entry
            await pool.query(`
        INSERT INTO diary_entries (user_id, title, content, entry_date, mood, energy_level, tags) VALUES
        ($1, 'Feeling Better Today', 'Had a good day today. Back pain was manageable, and I was able to go for a walk. The new medication routine seems to be helping.', CURRENT_DATE, 'positive', 7, '{"pain management", "exercise", "medication"}')
      `, [userId]);

            // Insert sample pill confirmation
            await pool.query(`
        INSERT INTO pill_confirmations (user_medication_id, scheduled_time, confirmed_time, status) VALUES
        ((SELECT id FROM user_medications WHERE user_id = $1 LIMIT 1), CURRENT_TIMESTAMP - INTERVAL '2 hours', CURRENT_TIMESTAMP - INTERVAL '2 hours', 'confirmed')
      `, [userId]);
        }

        console.log('✅ Database seeded successfully!');
        console.log('📝 Sample data created:');
        console.log('  - 5 medications from public API');
        console.log('  - 1 demo user');
        console.log('  - 2 user medications');
        console.log('  - 2 reminders');
        console.log('  - 3 pain records');
        console.log('  - 1 diary entry');
        console.log('  - 1 pill confirmation');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
};

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('🎉 Database seeding complete!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Seeding error:', error);
            process.exit(1);
        });
}

export { seedDatabase }; 