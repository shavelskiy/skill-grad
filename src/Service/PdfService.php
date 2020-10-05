<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Process\Process;

class PdfService
{
    protected const PDF_TMP_DIR_PARAM_KEY = 'pdf_tmp_dir';
    protected const REPLENISH_DIR_PARAM_KEY = 'replenish_dir';

    protected const PDF_GENERATE_COMMAND = '/usr/bin/wkhtmltopdf';

    protected string $pdfTmpDir;
    protected string $replenishDir;

    public function __construct(
        ParameterBagInterface $params
    ) {
        $this->pdfTmpDir = $params->get(self::PDF_TMP_DIR_PARAM_KEY);
        $this->replenishDir = $params->get(self::REPLENISH_DIR_PARAM_KEY);
    }

    public function generate($input, $output): void
    {
        if (!is_dir($this->pdfTmpDir)) {
            mkdir($this->pdfTmpDir, 0777);
        }

        $fileName = $this->pdfTmpDir . sprintf('/pdf_tmp_%s.html', time());

        $command = sprintf('%s %s %s', self::PDF_GENERATE_COMMAND, $fileName, escapeshellarg(sprintf('%s/%s', $this->replenishDir, $output)));

        try {
            file_put_contents($fileName, $input);

            $process = Process::fromShellCommandline($command);
            $process->run();

            unlink($fileName);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
