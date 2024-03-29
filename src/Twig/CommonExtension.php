<?php

namespace App\Twig;

use App\Entity\User;
use App\Helpers\CompareHelper;
use App\Repository\CategoryRepository;
use App\Repository\ChatMessageRepository;
use App\Service\User\UserInfoInterface;
use Symfony\Component\HttpFoundation\ParameterBag;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class CommonExtension extends AbstractExtension
{
    protected ChatMessageRepository $chatMessageRepository;
    protected CategoryRepository $categoryRepository;
    protected UserInfoInterface $userService;

    public function __construct(
        ChatMessageRepository $chatMessageRepository,
        CategoryRepository $categoryRepository,
        UserInfoInterface $userService
    ) {
        $this->chatMessageRepository = $chatMessageRepository;
        $this->categoryRepository = $categoryRepository;
        $this->userService = $userService;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('getCompareCount', [$this, 'getCompareCount']),
            new TwigFunction('inCompare', [$this, 'inCompare']),
            new TwigFunction('getUsername', [$this, 'getUsername']),
            new TwigFunction('getUserPhoto', [$this, 'getUserPhoto']),
            new TwigFunction('getNewMessagesCount', [$this, 'getNewMessagesCount']),
            new TwigFunction('getRootCategories', [$this, 'getRootCategories']),
            new TwigFunction('getChildCategories', [$this, 'getChildCategories']),
        ];
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('declension', [$this, 'declension']),
        ];
    }

    public function getCompareCount(ParameterBag $cookies): int
    {
        return count(CompareHelper::getCompareProgramsFromParameterBag($cookies));
    }

    public function inCompare(int $programId, ParameterBag $cookies): bool
    {
        return in_array($programId, CompareHelper::getCompareProgramsFromParameterBag($cookies), true);
    }

    public function getUsername(?User $user): string
    {
        return $this->userService->getUsername($user);
    }

    public function getUserPhoto(?User $user): string
    {
        return $this->userService->getUserPhoto($user);
    }

    public function getNewMessagesCount(User $user): int
    {
        return $this->chatMessageRepository->findNewMessageCount($user);
    }

    public function declension($number, $variants): string
    {
        $number %= 100;

        if ($number >= 5 && $number <= 20) {
            return $variants[2];
        }

        $number %= 10;

        if ($number === 1) {
            return $variants[0];
        }

        if ($number >= 2 && $number <= 4) {
            return $variants[1];
        }

        return $variants[2];
    }

    public function getRootCategories(): array
    {
        return $this->categoryRepository->findRootCategories();
    }

    public function getChildCategories($categoryId): array
    {
        if ((int)$categoryId < 1) {
            return [];
        }

        if (($category = $this->categoryRepository->find($categoryId)) === null) {
            return [];
        }

        return $category->getChildCategories()->toArray();
    }
}
