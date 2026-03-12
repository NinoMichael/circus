<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            //user fields
            'firstname' => ['required', 'string', 'max:255'],
            'lastname'  => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'unique:users,email'],
            'phone'     => ['required', 'string'],
            'password'  => ['required', 'confirmed', Password::defaults()],

            //profile fields
            'avatar'      => ['nullable', 'string'],
            'birth_date'  => ['required', 'date'],
            'national_id' => ['required', 'string'],
            'is_male'     => ['required', 'boolean'],
            'address'     => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'firstname.required'   => 'Le prénom est obligatoire.',
            'lastname.required'    => 'Le nom est obligatoire.',
            'email.required'       => 'L\'email est obligatoire.',
            'email.email'          => 'L\'email n\'est pas valide.',
            'email.unique'         => 'Cet email est déjà utilisé.',
            'password.required'    => 'Le mot de passe est obligatoire.',
            'password.confirmed'   => 'Les mots de passe ne correspondent pas.',
            'birth_date.required'  => 'La date de naissance est obligatoire.',
            'birth_date.date'      => 'La date de naissance n\'est pas valide.',
            'national_id.required' => 'Le numéro CIN est obligatoire.',
            'is_male.required'     => 'Le genre est obligatoire.',
            'is_male.boolean'      => 'Le genre n\'est pas valide.',
            'address.required'     => 'L\'adresse est obligatoire.',
        ];
    }
}
