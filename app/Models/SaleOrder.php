<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class SaleOrder extends Model
{
    use HasFactory, CreatedUpdatedBy, SoftDeletes;

    protected $fillable = ['partner_id','comment','order_date'];
    protected $appends = ['total_amount'];

    protected function totalAmount(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => SaleOrderDetail::where("sale_order_id",$this->id)->sum('total_amount'),
            // get: fn ($value) => $this->id,

        );
    }



    /**
     * Get the post that owns the Sale Order.
     */
    public function customer()
    {
        return $this->belongsTo(Partner::class,  'partner_id', 'id');
    }

     /**
     * Get the details for the Sale Order.
     */
    public function details()
    {
        return $this->hasMany(SaleOrderDetail::class);
    }
}
