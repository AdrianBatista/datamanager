<?php

namespace App\Modules;

use App\Models\Excel;
use App\Models\Workspace;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class LocalStorage
{
    static function saveExcelFile(Workspace $workspace, UploadedFile $file): string|null
    {
        try {
            $fileDestiny = "workspaces/{$workspace->id}/{$file->getClientOriginalName()}";
            Storage::disk("local")->put($fileDestiny, $file->getContent());
            return $fileDestiny;
        } catch (\Throwable $th) {
            return null;
        }
    }

    static function loadExcelFile(Excel $excel): Spreadsheet|null
    {
        try {
            $file = Storage::path($excel->file);
            return IOFactory::load($file);
        } catch (\Throwable $th) {
            return null;
        }
    }
}