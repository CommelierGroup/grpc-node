import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

// Protobuf 컴파일
const packageDefinition = protoLoader.loadSync('../protos/user.proto')
const packageObject = grpc.loadPackageDefinition(packageDefinition)

// gRPC 서버 생성
const server = new grpc.Server()

// 서비스 추가
server.addService(packageObject.UserService.service, {
  getUserById: (call, callback) => {
    const userId = call.request.id
    const user = getUserById(userId)

    // 첫번째 인수: 에러
    // 두번째 인수: 실제 데이터
    callback(null, user)
  }
})

function getUserById(id) {
  return { id, name: 'John Doe', age: 20 }
}

// 서버 시작
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start()

  console.log('Server started')
})
