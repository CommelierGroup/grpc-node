import {sendUnaryData, Server, ServerCredentials, ServerUnaryCall} from '@grpc/grpc-js'
import {GetUserRequest, GetUserResponse, UserServiceService} from "@grpc-node/protos/user";

// grpc 서버 생성
const server = new Server()

server.addService(UserServiceService, {
    getUserById: (call: ServerUnaryCall<GetUserRequest, GetUserResponse>, callback: sendUnaryData<GetUserResponse>) => {
        const userId = call.request.id
        const user = getUserById(userId)

        // 구현
        callback(null, user)
    }
})

function getUserById(id: string): GetUserResponse {
    return {id, name: 'John Doe', age: 10}
}

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start()

    console.log('Server started')
})
