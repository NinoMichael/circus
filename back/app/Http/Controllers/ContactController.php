<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(ContactRequest $request)
    {
        $contact = Contact::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Message envoyé avec succès.',
            'data'    => $contact,
        ], 201);
    }
}
