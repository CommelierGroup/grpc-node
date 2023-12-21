// client 생성
import { UserServiceClient } from '@grpc-node/protos/user'
import { credentials } from '@grpc/grpc-js'
import * as process from 'process'

const client = new UserServiceClient('localhost:50051', credentials.createInsecure())

client.getUserById({ id: '1234' }, (error, response) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(response)
})
