import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'node:path'

// Protobuf 컴파일
const packageDefinition = protoLoader.loadSync(path.resolve('..', 'protos', 'user.proto'))
const packageObject = grpc.loadPackageDefinition(packageDefinition)

// client 생성
const client = new packageObject.UserService('localhost:50051', grpc.credentials.createInsecure())

// 요청
client.GetUserById({ id: '1234' }, (error, response) => {
  if (error) {
    return console.error(error)
  }

  console.log(response)
})
