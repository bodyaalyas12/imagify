-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "history" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "search" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_users_1" ON "users"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_users_2" ON "users"("email");
Pragma writable_schema=0;
