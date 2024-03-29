<?php

namespace App\Twig;

use App\Entity\Category;
use App\Entity\Provider;
use Doctrine\Common\Collections\Collection;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ProviderExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('providerCategories', [$this, 'providerCategories']),
        ];
    }

    public function providerCategories(Provider $provider): array
    {
        return [
            'main' => $this->prepareCategoriesArray($provider->getCategories()),
            'additional' => [],
        ];
    }

    protected function prepareCategoriesArray(Collection $categories): array
    {
        $result = [];

        /** @var Category $category */
        foreach ($categories as $category) {
            $parentCategory = $category->getParentCategory();

            if ($parentCategory === null) {
                continue;
            }

            if (!isset($result[$parentCategory->getId()])) {
                $result[$parentCategory->getId()] = [
                    'item' => $parentCategory,
                    'childItems' => [],
                ];
            }

            $result[$parentCategory->getId()]['childItems'][] = $category;
        }

        return $result;
    }
}
