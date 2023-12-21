import { credentials } from '@grpc/grpc-js'
import { UserServiceClient } from '@grpc-node/protos/user'

// client 생성
const client = new UserServiceClient('localhost:50051', credentials.createInsecure())

// 요청
client.getUserById({ id: '1234' }, (error, response) => {
  if (error) {
    return console.error(error)
  }

  console.log(response)
})
