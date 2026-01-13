export const KAFKA_BROKER = process.env.KAFKA_BROKER ?? 'localhost:9093';
export const KAFKA_CLIENT_ID = 'eventflowapp';

//Kafka Topics
export const KAFKA_TOPICS = {
  //Auth events
  USER_REGISTERED: 'user.registered',
  USER_LOGIN: 'user.login',
  PASSWORD_RESET_REQUESTED: 'user.password-reset-requested',

  //Event events
  EVENT_CREATED: 'event.created',
  EVENT_UPDATED: 'event.updated',
  EVENT_CANCELED: 'event.canceled',

  TICKET_PURCHASED: 'ticket.purchased',
  TICKET_CANCELLED: 'ticket.cancelled',
  TICKET_CHECKED_IN: 'ticket.checked-in',

  PAYMENT_REFUNDED: 'payment.refunded', // Оплата ініційована, чекаємо на відповідь шлюзу
  PAYMENT_COMPLETED: 'payment.completed', // Гроші успішно знято
  PAYMENT_FAILED: 'payment.failed', // Помилка оплати (немає коштів, відмова банку)

  // Notifications
  SEND_EMAIL: 'notification.send-email',
  SEND_PUSH: 'notification.send-push',
} as const;

export type KafkaTopics = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];
