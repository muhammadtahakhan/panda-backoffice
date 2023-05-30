<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\SoftDeletes;



class Partner extends Model
{
    use HasFactory, CreatedUpdatedBy, SoftDeletes;
    protected $fillable = ['name','name_urdu','phone', 'address'];

}
