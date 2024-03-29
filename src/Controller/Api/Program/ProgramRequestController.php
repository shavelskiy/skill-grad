<?php

namespace App\Controller\Api\Program;

use App\Dto\SearchQuery;
use App\Entity\Program\Program;
use App\Entity\Program\ProgramRequest;
use App\Repository\ProgramRequestRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/profile/request")
 */
class ProgramRequestController extends AbstractController
{
    protected const PAGE_ITEM_COUNT = 10;

    protected EntityManagerInterface $entityManager;
    protected ProgramRequestRepository $programRequestRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        ProgramRequestRepository $programRequestRepository
    ) {
        $this->entityManager = $entityManager;
        $this->programRequestRepository = $programRequestRepository;
    }

    /**
     * @Route("/{program}", methods={"GET"}, name="api.profile.request.index")
     */
    public function index(Program $program, Request $request): Response
    {
        $query = (new SearchQuery())
            ->setPage((int)($request->get('page', 1)))
            ->setPageItemCount(self::PAGE_ITEM_COUNT);

        $searchResult = $this->programRequestRepository->getPaginatorResult($query);

        $requests = [];

        /** @var ProgramRequest $programRequest */
        foreach ($searchResult->getItems() as $programRequest) {
            $user = $programRequest->getUser();

            $requests[] = [
                'id' => $programRequest->getId(),
                'user_name' => ($user->getUserInfo() !== null && !empty($user->getUserInfo()->getFullName())) ? $user->getUserInfo()->getFullName() : $user->getUsername(),
                'contacts' => [
                    'email' => $user->getEmail(),
                    'phone' => ($user->getUserInfo() !== null) ? $user->getUserInfo()->getPhone() : '',
                ],
                'comment' => $programRequest->getComment(),
                'status' => $programRequest->getStatus(),
                'date' => $programRequest->getCreatedAt()->format('c'),
            ];
        }

        return new JsonResponse([
            'items' => $requests,
            'program_title' => $program->getName(),
            'page' => $searchResult->getCurrentPage(),
            'total_pages' => $searchResult->getTotalPageCount(),
        ]);
    }

    /**
     * @Route("/agree/{programRequest}", methods={"POST"}, name="api.profile.request.agree")
     */
    public function agree(ProgramRequest $programRequest): Response
    {
        $programRequest->setStatus(ProgramRequest::STATUS_AGREE);

        $this->entityManager->persist($programRequest);
        $this->entityManager->flush();

        return new JsonResponse([]);
    }

    /**
     * @Route("/reject/{programRequest}", methods={"POST"}, name="api.profile.request.reject")
     */
    public function reject(ProgramRequest $programRequest, Request $request): Response
    {
        $programRequest
            ->setStatus(ProgramRequest::STATUS_REJECT)
            ->setRejectReason($request->get('reason', ''));

        $this->entityManager->persist($programRequest);
        $this->entityManager->flush();

        return new JsonResponse([]);
    }
}
