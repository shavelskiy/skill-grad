<?php

namespace App\Twig;

use DateTime;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class DateExtension extends AbstractExtension
{
    protected const MONTHS = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    public function getFilters(): array
    {
        return [
            new TwigFilter('blogDate', [$this, 'blogDate']),
            new TwigFilter('month', [$this, 'month']),
        ];
    }

    public function blogDate(DateTime $date): string
    {
        return sprintf('%s %s %s, %s',
            $date->format('d'),
            mb_substr(self::MONTHS[$date->format('m') - 1], 0, 3),
            $date->format('Y'),
            $date->format('h:i')
        );
    }

    public function month(int $month): string
    {
        return self::MONTHS[$month - 1];
    }
}
