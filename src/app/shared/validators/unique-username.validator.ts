import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function uniqueUsernameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;

    // Якщо значення відсутнє, повертаємо null (валідатор не працює)
    if (!username) {
      return of(null);
    }

    // Симулюємо затримку з використанням setTimeout через delay
    return of(username).pipe(
      delay(2000), // Затримка 2 секунди
      map((existingUsername) => {
        // Симулюємо умову, де "testuser" вже зайнятий
        return existingUsername === 'testuser' ? { usernameTaken: true } : null;
      })
    );
  };
}
