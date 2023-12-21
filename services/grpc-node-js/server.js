import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

// 1. Protobuf 불러오기
const packageDefinition = protoLoader.loadSync('../../packages/protos/user.proto')
const packageObject = grpc.loadPackageDefinition(packageDefinition)

// 2. gRPC 서버 생성
const server = new grpc.Server()

// 3. 서비스 추가
server.addService(packageObject.UserService.service, {
  getUserById: (call, callback) => {
    const userId = call.request.id
    const user = getUserById(userId)

    // 첫번째 인수: 에러
    // 두번째 인수: 실제 데이터
    callback(null, user)
  }
})

// 레포지토리 구현
function getUserById(id) {
  return { id, name: 'John Doe', age: 20 }
}

// 서버 시작
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start()

  console.log('Server started')
})
