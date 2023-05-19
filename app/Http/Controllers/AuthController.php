<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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

            $user = User::where('email', $request->input('email'))->first();

            $token = $user->createToken('auth_token')->plainTextToken;

            $cookie = cookie('token', $token, 60 * 24); // 1 day

            return response()->json([
                'success' => true,
                'user' => new UserResource(Auth::user()),
            ])->withCookie($cookie);
        }

        return response()->json(['success' => false ]);
    }

    public function logout(Request $request)
    {
        // $request->user()->currentAccessToken()->delete();
        // $cookie = cookie()->forget('token');

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }
}
