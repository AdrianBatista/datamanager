<?php

use App\Models\User;

/**
 * Shorter auth()->user()
 * But used mainly due to interface Authenticatable and not User on original method,
 * that causes undefined method warning on IDE
 *
 * @return \App\Models\User
 */
function user(): User
{
    return auth()->user();
}
