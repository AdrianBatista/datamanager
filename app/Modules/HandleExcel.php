<?php

namespace App\Modules;

use PhpOffice\PhpSpreadsheet\Spreadsheet;

class HandleExcel
{
    static public function insertData(Spreadsheet $spreadsheet): Spreadsheet
    {
        return $spreadsheet;
    }
}