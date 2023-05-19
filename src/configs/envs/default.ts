export const config = {
  db: {},
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: true,
    autoTransformHttpErrors: true,
    // cors: { credentials: true },
    // sortSchema: true,
    // installSubscriptionHandlers: true,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  grpcServerUrl: process.env.PORT_GRPC_URL,
  rabbitmq: {
    hostname: process.env.RABBITMQ_HOST,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASWORD,
    port: +process.env.RABBITMQ_PORT,
  },
};
