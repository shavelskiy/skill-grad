<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201004215815 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE program_review ALTER review TYPE TEXT');
        $this->addSql('ALTER TABLE program_review ALTER review DROP DEFAULT');
        $this->addSql('ALTER TABLE program_review ALTER answer TYPE TEXT');
        $this->addSql('ALTER TABLE program_review ALTER answer DROP DEFAULT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE program_review ALTER review TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE program_review ALTER review DROP DEFAULT');
        $this->addSql('ALTER TABLE program_review ALTER answer TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE program_review ALTER answer DROP DEFAULT');
    }
}
