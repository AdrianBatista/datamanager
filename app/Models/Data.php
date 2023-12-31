<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Data extends Model
{
    use HasFactory;

    protected $fillable = ['workspace_id', 'author_id', 'title', 'structure'];

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function getStructureAttribute($value)
    {
        $pattern = '/null/';
        $replacement = "\"\"";
        $newValue = preg_replace($pattern, $replacement, $value);
        return $newValue !== "" ? $newValue : "{}";
    }
}
