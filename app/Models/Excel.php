<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Excel extends Model
{
    use HasFactory;

    protected $fillable = [
        "workspace_id",
        "file"
    ];

    public function getNameAttribute(): string
    {
        preg_match("/[^\/]*\.xlsx$/", $this->file, $matches);
        return $matches[0];
    }

    public function workspace() {
        return $this->belongsTo(Workspace::class);
    }

    public function toArray()
    {
        return array_merge(parent::toArray(), ['name' => $this->name]);
    }
}
