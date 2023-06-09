<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MakePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'partner_id' => 'required|exists:partners,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date_format:Y-m-d',
        ];
    }
}
