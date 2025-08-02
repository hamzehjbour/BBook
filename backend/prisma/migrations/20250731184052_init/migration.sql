-- CreateTable
CREATE TABLE `Appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceId` INTEGER NOT NULL,
    `staffId` INTEGER NOT NULL,
    `clientName` VARCHAR(100) NOT NULL,
    `appointment_utc` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
