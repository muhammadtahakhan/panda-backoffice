<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Casts\Attribute;


class Partner extends Model
{
    use HasFactory, CreatedUpdatedBy, SoftDeletes;
    protected $fillable = ['name','name_urdu','phone', 'address'];
    protected $appends = ['balance'];

    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => 2390,

        );
    }

}
