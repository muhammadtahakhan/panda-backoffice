<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTransaction extends Model
{
    use HasFactory;
    protected $fillable = ['product_id','quantity','cost_price', 'sale_price'];

    /**
     * Get the post that owns the comment.
     */
    public function product()
    {
        return $this->belongsTo(Product::class,  'product_id', 'id');
    }
}
