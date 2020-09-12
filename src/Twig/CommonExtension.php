<?php

namespace App\Twig;

use App\Helpers\CompareHelper;
use Symfony\Component\HttpFoundation\ParameterBag;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CommonExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('getCompareCount', [$this, 'getCompareCount']),
            new TwigFunction('inCompare', [$this, 'inCompare']),
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
}