<?php

namespace App\Modules;

use App\Models\Workspace;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class HandleExcel
{
    static public function insertData(Spreadsheet $spreadsheet, Workspace $workspace): Spreadsheet
    {
        $sheets = $spreadsheet->getAllSheets();
        foreach ($sheets as $sheet) {
            $highestRow = $sheet->getHighestRow();
            $highestColumn = Coordinate::columnIndexFromString($sheet->getHighestColumn());
            for ($i = 1; $i <= $highestRow; $i++) {
                for ($j = 1; $j <= $highestColumn; $j++) {
                    $cell = $sheet->getCell([$j, $i]);
                    HandleExcel::replaceCellValue($cell, $workspace);
                }
            }
        }
        return $spreadsheet;
    }

    static public function replaceCellValue(Cell $cell, Workspace $workspace): void
    {
        $value = $cell->getValue();
        preg_match("/^\[.*\]$/", $value, $matches);
        if (!isset($matches[0]))
            return;

        $dataReference = trim($matches[0], "[]");
        $dataSteps = explode(".", $dataReference);

        $dataGroupCandidate = $dataSteps[0];
        $dataGroups = $workspace->datas;
        $dataGroup = $dataGroups->first(fn($group) => $group->title === $dataGroupCandidate);
        if ($dataGroup) {
            unset($dataSteps[0]);
            $newValue = json_decode($dataGroup->structure, true);
            foreach ($dataSteps as $step) {
                $newValue = $newValue[$step];
            }

            if (gettype($newValue) === "string") {
                $cell->setValue($newValue);
            }

            if (gettype($newValue) === "array") {
                $array = $newValue;
                unset($array[0]);
                $array = array_values($array);
                HandleExcel::insertTable($cell, $array);
            }
        }
    }

    static public function insertTable(Cell $cell, array $data): void
    {
        $rows = count($data);
        $columns = count($data[0]);
        $firstRow = $cell->getRow();
        $firstColumn = Coordinate::columnIndexFromString($cell->getColumn());
        $sheet = $cell->getWorksheet();
        for ($i = 0; $i < $rows; $i++) {
            $row = array_values($data[$i]);
            for ($j = 0; $j < $columns; $j++) {
                $currentCell = $sheet->getCell([$firstColumn + $j, $firstRow + $i]);
                $currentCell->setValue($row[$j]);
            }
        }
    }
}