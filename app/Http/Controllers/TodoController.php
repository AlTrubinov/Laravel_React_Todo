<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Storage;

class TodoController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;

        $todos = Todo::where('user_id', $user_id)->get();

        return $todos;
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        return Todo::create($validatedData);
    }

    public function show($id)
    {
        $todo = Todo::findOrFail($id);

        if ($todo->user_id !== auth()->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        return $todo;
    }

    // public function update(Request $request, $id)
    // {
    //     $todo = Todo::findOrFail($id);

    //     $validatedData = $request->validate([
    //         'title' => 'required|max:255',
    //         'description' => 'required',
    //     ]);

    //     $todo->update($validatedData);

    //     return $todo;
    // }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        if ($todo->user_id !== auth()->user()->id) {
            abort(403, 'Unauthorized action.');
        }
        $todo->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function saveToFile(Request $request)
    {
        $user_id = auth()->user()->id;

        $todos = Todo::where('user_id', $user_id)->get();

        $content = '';
        foreach ($todos as $todo) {
            $content .= $todo->title . " - " . $todo->description . "\n";
        }

        return $content;
    }
}
