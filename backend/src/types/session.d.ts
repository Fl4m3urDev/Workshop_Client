import 'express-session';
import { Roles } from 'src/guards/is-authorized/roles';

declare module 'express-session' {
  interface Session {
    user?: {
      isLogged: boolean;
      role: Roles;
      id: user.user_id,
      email: user.email

      // Declare here your session data
    };
  }
}
