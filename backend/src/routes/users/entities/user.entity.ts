import { SubscriptionType } from '../dto/create-user.dto';

export class User {
  user_id: number;
  username: string;
  email?: string | null;
  password: string;
  subscription_type: SubscriptionType;
  created_at: Date;
}
