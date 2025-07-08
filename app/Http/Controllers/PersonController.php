<?php

namespace App\Http\Controllers;
use App\Models\Person;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class PersonController extends Controller
{

    protected $current_user;

    public function __construct()
    {
        $this->current_user = User::findOrFail(auth()->id());
    }

    public function index(Request $request)
    {

        $search = $request->input('search');
        $contacts = Person::query()
        ->where('user_id', '=', auth()->id())
        ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
        ->orderBy('created_at', 'DESC')
        ->paginate(10)
        ->withQueryString();
         return Inertia::render('Contacts/ContactList', [
            'contacts' => $contacts,
            'filters' => $search,
        ]);
    }

    /**
     * Show the form for creating the resource.
     */
    public function create()
    {

        return Inertia::render('Contacts/RegisterContact', [
            'current_user' => $this->current_user,
        ]);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => ['required', 'string', 'max:20', 'regex:/^\+?\d{1,3}\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/'],
            'note' => 'nullable|string|max:500',
        ]);

        Person::create($request->all());
        return redirect()->route('contacts')->with('message', 'New contact created successfully!');
    }

    /**
     * Display the resource.
     */
    public function show(Person $person)
    {
        if ($person->user_id !== auth()->id()) {
            abort(404);
        }

        return Inertia::render('Contacts/ViewContact', compact('person'));
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(Person $person)
    {
        if ($person->user_id !== auth()->id()) {
            abort(404);
        }

        return Inertia::render('Contacts/EditContact', [
            'person' => $person,
            'current_user' => $this->current_user,
        ]);
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request, Person $person)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => ['required', 'string', 'max:20', 'regex:/^\+?\d{1,3}\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/'],
            'note' => 'nullable|string|max:500',
        ]);

        $person->update($request->all());
        return redirect()->route('contacts')->with('message', 'Contact updated successfully!');
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(Person $person)
    {
        $person->delete();
        return redirect()->route('contacts')->with('message', 'Contact deleted successfully!');
    }
}
