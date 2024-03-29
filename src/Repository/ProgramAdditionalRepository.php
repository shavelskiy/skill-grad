<?php

namespace App\Repository;

use App\Dto\PaginatorResult;
use App\Dto\SearchQuery;
use App\Entity\Program\ProgramAdditional;
use App\Helpers\Paginator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ProgramAdditional|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProgramAdditional|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProgramAdditional[]    findAll()
 * @method ProgramAdditional[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProgramAdditionalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProgramAdditional::class);
    }

    public function findActiveAdditional(): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.active = true')
            ->orderBy('p.sort', 'asc')
            ->getQuery()
            ->getResult();
    }

    /**
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function getPaginatorResult(SearchQuery $searchQuery): PaginatorResult
    {
        $query = $this->createQueryBuilder('p');

        if ($searchQuery->getOrderField() !== null) {
            $query->addOrderBy('p.' . $searchQuery->getOrderField(), $searchQuery->getOrderType());
        }

        $query
            ->addOrderBy('p.id', 'asc')
            ->addOrderBy('p.sort', 'asc');

        foreach ($searchQuery->getSearch() as $field => $value) {
            switch ($field) {
                case 'id':
                    $query
                        ->andWhere('p.id = :id')
                        ->setParameter('id', (int)$value);
                    break;
                case 'name':
                    $query
                        ->andWhere('upper(p.title) like :title')
                        ->setParameter('title', '%' . mb_strtoupper($value) . '%');
                    break;
                case 'sort':
                    $query
                        ->andWhere('p.sort = :sort')
                        ->setParameter('sort', (int)$value);
                    break;
                case 'active':
                    $query
                        ->andWhere('p.active = :active')
                        ->setParameter('active', $value);
            }
        }

        return (new Paginator())
            ->setQuery($query)
            ->setPageItems($searchQuery->getPageItemCount())
            ->setPage($searchQuery->getPage())
            ->getResult();
    }
}
