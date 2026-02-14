import { neon } from '@neondatabase/serverless';

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Extract URL if it's in psql command format
if (databaseUrl.includes('psql')) {
  const match = databaseUrl.match(/'([^']+)'/);
  if (match && match[1]) {
    databaseUrl = match[1];
  }
}

const sql = neon(databaseUrl);

async function seedDatabase() {
  try {
    console.log('[v0] Starting database seeding...');

    // Check if admin user exists
    const existingAdmin = await sql.query(
      `SELECT id FROM users WHERE email = $1 AND role = $2`,
      ['admin@wealthpath.com', 'admin']
    );

    let adminId;

    if (existingAdmin.length === 0) {
      console.log('[v0] Creating admin user...');
      const hashedPassword = Buffer.from('Admin@2024').toString('base64');
      
      const adminResult = await sql.query(
        `INSERT INTO users (email, password_hash, name, role, avatar_url) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        ['admin@wealthpath.com', hashedPassword, 'Admin User', 'admin', '/avatars/admin.jpg']
      );
      adminId = adminResult[0].id;
      console.log('[v0] Admin user created with ID:', adminId);
    } else {
      adminId = existingAdmin[0].id;
      console.log('[v0] Admin user already exists with ID:', adminId);
    }

    // Check if articles exist
    const articleCount = await sql.query(`SELECT COUNT(*) as count FROM articles`);
    
    if (articleCount[0].count === 0) {
      console.log('[v0] Seeding articles...');
      
      const articles = [
        {
          title: 'Stock Market Investing for Beginners',
          slug: 'stock-market-investing-beginners',
          content: 'Learn the fundamentals of stock market investing...',
          excerpt: 'A comprehensive guide to getting started with stock investments.',
          category: 'Investing',
          author_id: adminId,
          status: 'published',
          featured: true,
          meta_title: 'Stock Market Investing Guide',
          meta_description: 'Learn stock market investing from scratch'
        },
        {
          title: 'Freelancing: Build Your First Client',
          slug: 'freelancing-build-first-client',
          content: 'Strategies to land your first freelancing client...',
          excerpt: 'Expert tips for getting your first paying client.',
          category: 'Freelancing',
          author_id: adminId,
          status: 'published',
          featured: true,
          meta_title: 'First Freelancing Client Guide',
          meta_description: 'How to get your first freelancing client'
        },
        {
          title: 'E-commerce Business Essentials',
          slug: 'ecommerce-business-essentials',
          content: 'Everything you need to know to start an online store...',
          excerpt: 'Complete guide to starting an e-commerce business.',
          category: 'E-Commerce',
          author_id: adminId,
          status: 'published',
          featured: false,
          meta_title: 'E-commerce Business Guide',
          meta_description: 'Start your e-commerce business today'
        }
      ];

      for (const article of articles) {
        await sql.query(
          `INSERT INTO articles (title, slug, content, excerpt, category, author_id, status, featured, meta_title, meta_description, views)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            article.title,
            article.slug,
            article.content,
            article.excerpt,
            article.category,
            article.author_id,
            article.status,
            article.featured,
            article.meta_title,
            article.meta_description,
            Math.floor(Math.random() * 1000)
          ]
        );
      }
      console.log('[v0] Articles seeded successfully');
    }

    // Check if courses exist
    const courseCount = await sql.query(`SELECT COUNT(*) as count FROM courses`);
    
    if (courseCount[0].count === 0) {
      console.log('[v0] Seeding courses...');
      
      const courses = [
        {
          title: 'Advanced Stock Trading',
          description: 'Master stock trading strategies',
          instructor_id: adminId,
          price: 99.99,
          duration_hours: 15,
          level: 'Advanced',
          modules: 5,
          published: true
        },
        {
          title: 'Freelancing Masterclass',
          description: 'Complete guide to freelancing success',
          instructor_id: adminId,
          price: 79.99,
          duration_hours: 12,
          level: 'Intermediate',
          modules: 4,
          published: true
        }
      ];

      for (const course of courses) {
        await sql.query(
          `INSERT INTO courses (title, description, instructor_id, price, duration_hours, level, modules, published, students_enrolled, rating)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            course.title,
            course.description,
            course.instructor_id,
            course.price,
            course.duration_hours,
            course.level,
            course.modules,
            course.published,
            Math.floor(Math.random() * 100),
            (Math.random() * 2 + 3.5).toFixed(1)
          ]
        );
      }
      console.log('[v0] Courses seeded successfully');
    }

    console.log('[v0] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
