<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials, !empty($request->input('remember')))) {
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'user' => new UserResource(Auth::user()),
            ]);
        }

        return response()->json(['success' => false ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }
}
