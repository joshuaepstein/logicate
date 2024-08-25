#! /bin/bash

set -e
pnpm prisma generate
pnpm build
# Deploy migration using direct database connection (no pooled connection)
DATABASE_URL=$DIRECT_DATABASE_URL pnpm db:deploy