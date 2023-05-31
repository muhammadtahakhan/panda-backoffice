<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Casts\Attribute;
class Payment extends Model
{
    use HasFactory, CreatedUpdatedBy, SoftDeletes;

    protected $fillable = ['partner_id','amount','payment_date'];

}
