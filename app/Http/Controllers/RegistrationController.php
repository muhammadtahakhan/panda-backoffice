<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Spatie\Newsletter\Facades\Newsletter;
use Illuminate\Auth\Access\AuthorizationException;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'                => 'required|string',
            'email'               => 'required|string|email|unique:users',
            'password'            => 'required|string|confirmed',
            'enable_mailing_list' => 'nullable|boolean',
        ]);

        $user = User::create([
            'name'    => $request->name,
            'email'    => strtolower($request->email),
            'password' => Hash::make($request->password)
        ]);

        event(new Registered($user));

        return response()->json([
            'success' => true,
        ], 201);
    }

    public function resend(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email'
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if (!empty($user) && !$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
        }

        return response()->json(['success' => true]);
    }

    public function verify(Request $request)
    {
        $user = User::find($request->route('id'));

        if (! hash_equals((string) $request->route('id'), (string) $user->getKey())) {
            throw new AuthorizationException;
        }

        if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            throw new AuthorizationException;
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'success' => true,
                'message' => 'already_verified',
            ], 200);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json([
            'success' => true,
            'message' => 'verified',
            'user' => new UserResource($user),
        ], 200);
    }
}
