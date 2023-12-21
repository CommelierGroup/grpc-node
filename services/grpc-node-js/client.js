import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import * as process from 'node:process'

// Protobuf 컴파일
const packageDefinition = protoLoader.loadSync('../../packages/protos/user.proto')
const packageObject = grpc.loadPackageDefinition(packageDefinition)

// Client 생성
const client = new packageObject.UserService('localhost:50051', grpc.credentials.createInsecure())

// 요청 보내기
client.getUserById({ id: '1234' }, (error, response) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(response)
})
