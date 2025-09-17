import { SubscriptionType } from '../dto/create-user.dto';

export class User {
  user_id: number;
  username: string;
  email?: string | null;
  subscription_type: SubscriptionType;
  created_at: Date;
}
