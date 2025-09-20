# 1. Make sure your schema is up to date
npx prisma generate

# 2. Create migration for any schema changes
#npx prisma migrate dev --name "your-migration-name"

# 3. Deploy to production
npx prisma migrate deploy

# 4. Build and start your app
npm run build
npm start