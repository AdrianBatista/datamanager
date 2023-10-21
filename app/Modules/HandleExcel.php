<?php

namespace App\Modules;

use Exception;
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
                    self::replaceCellValue($cell, $workspace);
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
                self::insertTable($cell, $array);
            }
        }
    }

    static public function insertTable(Cell $cell, array $data): void
    {
        $tables = $cell->getWorksheet()->getTableCollection();
        $table = null;
        foreach ($tables as $tableIteration) {
            $cellBelongsToRange = self::coordinateIsInsideRange($tableIteration->getRange(), $cell->getCoordinate());
            if ($cellBelongsToRange) {
                $table = $tableIteration;
                break;
            }
        }

        $rows = count($data);
        $columns = count($data[0]);
        $firstRow = $cell->getRow();
        $firstColumn = Coordinate::columnIndexFromString($cell->getColumn());
        $sheet = $cell->getWorksheet();
        for ($i = 0; $i < $rows; $i++) {
            $row = array_values($data[$i]);

            if ($table) {
                $boundaries = Coordinate::rangeBoundaries($table->getRange());
                $rowsCount = $boundaries[1][1] - $boundaries[0][1];

                if ($rowsCount === $i) {
                    $boundaries[1][1]++;
                    $boundaries[0][0] = Coordinate::stringFromColumnIndex($boundaries[0][0]);
                    $boundaries[1][0] = Coordinate::stringFromColumnIndex($boundaries[1][0]);
                    $newRange = "{$boundaries[0][0]}{$boundaries[0][1]}:{$boundaries[1][0]}{$boundaries[1][1]}";
                    $table->setRange($newRange);
                }
            }

            for ($j = 0; $j < $columns; $j++) {
                $currentCell = $sheet->getCell([$firstColumn + $j, $firstRow + $i]);
                $currentCell->setValue($row[$j]);
            }
        }
    }

    static public function coordinateIsInsideRange(string $range, string $coordinate): bool
    {
        if (Coordinate::coordinateIsRange($range)) {
            $boundaries = Coordinate::rangeBoundaries($range);

            $coordinates = Coordinate::coordinateFromString($coordinate);
            $coordinates[0] = Coordinate::columnIndexFromString($coordinates[0]);

            $columnIsInside = $boundaries[0][0] <= $coordinates[0] && $coordinates[0] <= $boundaries[1][0];
            if (!$columnIsInside)
                return false;
            $rowIsInside = $boundaries[0][1] <= $coordinates[1] && $coordinates[1] <= $boundaries[1][1];
            if (!$rowIsInside)
                return false;
            return true;

        }
        throw new Exception('First argument needs to be a range');
    }
}