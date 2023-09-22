<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory, Uuids;

    protected $fillable = ['name'];

    public function workspaces(): HasMany
    {
        return $this->hasMany(Workspace::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
