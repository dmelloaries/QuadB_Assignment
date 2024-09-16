-- CreateTable
CREATE TABLE "Ticker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last" DOUBLE PRECISION NOT NULL,
    "buy" DOUBLE PRECISION NOT NULL,
    "sell" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "base_unit" TEXT NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);
