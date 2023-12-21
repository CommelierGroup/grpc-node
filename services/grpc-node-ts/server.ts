import { Server, sendUnaryData, ServerUnaryCall, ServerCredentials } from '@grpc/grpc-js'
import { GetUserRequest, GetUserResponse, UserServiceService } from '@grpc-node/protos/user'

// gRPC 서버 생성
const server = new Server()

// 서비스 추가
server.addService(UserServiceService, {
  getUserById: (call: ServerUnaryCall<GetUserRequest, GetUserResponse>, callback: sendUnaryData<GetUserResponse>) => {
    const userId = call.request.id
    const user: GetUserResponse = getUserById(userId)

    // 첫번째 인수: 에러
    // 두번째 인수: 실제 데이터
    callback(null, user)
  },
})

function getUserById(id: string): GetUserResponse {
  return { id, name: 'John Doe', age: 10 }
}

// 서버 시작
server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
  server.start()

  console.log('Server started')
})
