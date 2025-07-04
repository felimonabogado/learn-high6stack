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

    public function index()
    {
        $contacts = Person::select("*")->where('user_id', '=', auth()->id())->orderBy('created_at', 'DESC')->get();
         return Inertia::render('Contacts/ContactList', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show the form for creating the resource.
     */
    public function create()
    {

        //$current_user = User::findOrFail(auth()->id());
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
    public function show()
    {
        //  $data_list = [
        //     ['id' => 1, 'name' => 'John Doe', 'age' => 30],
        //     ['id' => 2, 'name' => 'Jane Smith', 'age' => 25],
        //     ['id' => 3, 'name' => 'Alice Johnson', 'age' => 28],
        //     ['id' => 4, 'name' => 'Bob Brown', 'age' => 35],
        // ];

        // return Inertia::render('Contacts/ContactList', [
        //     'mydata' => $data_list
        // ]);
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(Person $person)
    {
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
