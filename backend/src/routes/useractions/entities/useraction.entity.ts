import { ActionType } from '@prisma/client';

export class UserAction {
  action_id: number;
  user_id: number;
  article_id: number;
  action_type: ActionType;
  action_date: Date;
}
