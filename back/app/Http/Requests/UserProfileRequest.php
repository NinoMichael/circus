<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserProfileRequest extends FormRequest
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
            'firstname' => 'sometimes|string|max:255',
            'lastname' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:15',
            'email' => 'sometimes|email|max:255',
            'birth_date' => 'sometimes|date',
            'national_id' => 'sometimes|string|max:50',
            'is_male' => 'sometimes|boolean',
            'address' => 'sometimes|string|max:500',
            'license_number' => 'sometimes|string|max:50',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
