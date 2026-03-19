<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BuseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'nullable',
            'driver_id' => 'required',
            'type' => 'required|string',
            'registration_number' => 'required|string|max:255',
            'capacity' => 'required|min:1',
            'status' => 'required|in:active, maintenance, suspended',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
