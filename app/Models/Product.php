<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model
{
    use HasFactory, CreatedUpdatedBy, SoftDeletes;
    protected $fillable = ['name','name_urdu','code', 'cost_price', 'sale_price'];
    protected $appends = ['quantity'];

    protected function quantity(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ProductTransaction::where('product_id', $this->id)->sum('quantity'),

        );
    }

    /**
     * Get the comments for the blog post.
     */
    public function productTransaction()
    {
        return $this->hasMany(ProductTransaction::class);
    }

}
