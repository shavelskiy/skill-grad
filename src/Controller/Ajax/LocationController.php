<?php

namespace App\Controller\Ajax;

use App\Entity\Location;
use App\Repository\LocationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/ajax/location")
 */
class LocationController extends AbstractController
{
    protected LocationRepository $locationRepository;

    public function __construct(
        LocationRepository $locationRepository
    ) {
        $this->locationRepository = $locationRepository;
    }

    /**
     * @Route("/suggest", name="app.location.suggest", methods={"GET"})
     */
    public function suggest(Request $request): Response
    {
        $result = [];

        foreach ($this->locationRepository->findSuggestions($request->get('query')) as $location) {
            $result[] = [
                'id' => $location->getId(),
                'name' => ($location->getType() === Location::TYPE_CITY && $location->getParentLocation() !== null) ?
                    sprintf('%s (%s)', $location->getName(), $location->getParentLocation()->getName()) :
                    $location->getName(),
            ];
        }

        return new JsonResponse([
            'suggestions' => $result,
        ]);
    }
}
