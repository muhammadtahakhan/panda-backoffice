<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrderDetail extends Model
{
    use HasFactory, CreatedUpdatedBy, SoftDeletes;

    protected $fillable = ['purchase_order_id', 'product_id','quantity','unit_price','total_amount'];
}
