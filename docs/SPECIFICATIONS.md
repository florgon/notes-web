# Specification.
Notice: this is technical task specification, there is may be not documented here features on final project.
Specifiations is given by *SimbirSoft*.

### Website consists of these pages.
- Auth
- - Register (sign-up)
- - Login (sign-in)
- Notes
- - Take note
- - List notes
- Home
- - Home

### Menu.
Every page should contain menu with brand and these items:
- If not authenticated:
- - Home, Auth (Login / Register)
- If authenticated:
- - Home, Notes (List), Add note, Logout

### Auth.
- Registration (Sign-up)
- - Fields:
- - - Email
- - - Password
- - - Password confirmation
- - If user tries to register already registered email, this should be not allowed and user should get error message.
- - If user enters different passwords in "Password" and "Password confirmation", user should get error message.
- - After successfull registration, user should become authenticated and get access to pages with notes list and notes create page.
- Login (Sign-in)
- - Fields:
- - - Email
- - - Password
- - If there is any error with sign-in, error should shown to end-user.
### Notes.
- Notes list
- - Every note block on list should contain along with text also date and time when note was created.
- - Authenticated user should be allowed to see only own notes. (Not other user ones)
- Take note
- - Fields:
- - - Note text.
- - System should not allow to save empty notes. If user tries to save empty (blank) note, this should cause error that will shown to end-user.
- - Authenticated user should not be allowed to save notes under the guise of other user.
### Home.
- Message with overall user saved notes counter.


