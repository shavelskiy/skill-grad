<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201006210127 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE program_review ADD answer_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE program_review ADD CONSTRAINT FK_2D03BF9CEF2E1CE4 FOREIGN KEY (answer_user_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_2D03BF9CEF2E1CE4 ON program_review (answer_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE program_review DROP CONSTRAINT FK_2D03BF9CEF2E1CE4');
        $this->addSql('DROP INDEX IDX_2D03BF9CEF2E1CE4');
        $this->addSql('ALTER TABLE program_review DROP answer_user_id');
    }
}
