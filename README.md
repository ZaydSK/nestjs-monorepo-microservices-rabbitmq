# Docs
This repo represents a NestJS Microservice architecture implemented using **monorepo** pattern.

### Running the project
in order to run the project you need to:
- make a copy of **.env.example** file, name it **.env** and use your environment specific values.
you'll need a running **mongodb** server & **rabbitmq** broker, you can run the **rabbitmq** server usually using this command:
    > rabbitmq-server.bat

- execute the following command in the root directory to install the packages
    > npm install
  - or use your preferred package manager.


- start the projects using the following commands:
    > npm run ms1:start
  >
    > npm run ms2: start
  >
    > npm run start
  >
    the third command starts the 3rd microservice without the need to specify its name since it's the main project.

## Microservice 1 (Event Publisher)
The only module in this microservice imports the **RabbitMQModule** from *@golevelup/nestjs-rabbitmq* package and loads it with the shared configuration imported from the common libs which will be explained in the upcoming parts.


In the *rabbit.service* file you'll find **publish** function which emits an event every second to the **rabbitmq** broker using the **publish** function from the **amqpConnection** instance with the shared configuration imported from the common libs.

It extends the **OnModuleInit** to run the function as soon as the service is initialized.

## Microservice 2 (Event Receiver & Data Provider)
The **db.module** file imports the same **RabbitMQModule** that was imported in microservice-1, it also imports the **MongooseModule** from *@nestjs/mongoose* and initializes them.

This microservice acts as a data provider, it contains a **message** schema that persists the event data.

The **db.service** file contains two functions:
1. **handler** function which is decorated with **@RabbitSubscribe** decorator from *@golevelup/nestjs-rabbitmq* with the same configuration used in the **publish** function in *microservice-1*, and specifying a **queue** name to support the ***Horizontal Scaling***.
   - By specifying the queue name, We guarantee that all instances will share the same queue, resulting in handling each event in only one subscriber and inserting the event only once to the **DB**.

2. **rpcHandler** function which exposes an **RPC** to fetch the most recent 10 events from the **DB**, using a shared configuration.

## Microservice 3 (Event Receiver & API)
This microservice has 2 responsibilities that are shown in the **events.service** file:

- The **handler** function accepts the events published by the first microservice and logs it to the console.
  - this function is decorated with **@RabbitSubscribe**, the same decorator used in the second microservice.
  - this decorator didn't specify a queue name, taking in consideration the *@golevelup/nestjs-rabbitmq* gives a unique queue name for each subscriber, so it won't interfere with the subscriber in the second microservice.

- The **getLast10Events** function makes a request to the second microservice using the **request** function from **AmqpConnection** class, using the same configuration that was specified in the **rpcHandler** function in the second microservice.
    - This function is used in the **events.controller** file which exposes an API to be used in http requests to fetch the most recent 10 events from the **DB**.
    - To test the API, make a **GET** request to **events/last10**.

## Libs
This directory is intended to have all the common behaviors and constants that is shared across all projects.

### rabbitmq directory
This directory shares this common constants and interfaces:
1. **rabbitMQConfig**: the configurations used to connect to RabbitMQ broker.
2. **rabbitSubscribeOptions**: the configurations used in publishing and receiving events.
3. **rabbitRPCOptions**: the configurations used in **RPC** request.
4. **MessageInterface**: an interface that represents the event.
