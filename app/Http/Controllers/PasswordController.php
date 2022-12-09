<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

class PasswordController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $email = strtolower($request->input('email'));
        $user = User::where('email', $email)->first();

        if (!empty($user)) {
            Password::sendResetLink(['email' => $email]);
        }

        return response()->json(['success' => true]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => ['required', 'confirmed', 
                \Illuminate\Validation\Rules\Password::min(8)
            ],
        ]);

        $resetData = $request->only('email', 'password', 'password_confirmation', 'token');
        $resetData['email'] = strtolower($resetData['email']);
    
        $status = Password::reset(
            $resetData,
            function ($user, $password) use ($request) {
                event(new PasswordReset($user));
                $user->password = Hash::make($password);
                $user->email_verified_at = now();
                $user->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false, 'message' => $status], 401);
        }
    }
}
