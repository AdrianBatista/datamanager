<?php

namespace App\Modules;

use App\Models\Workspace;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
}