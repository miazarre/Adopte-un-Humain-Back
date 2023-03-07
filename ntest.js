import controller from './app/controllers/index.js';
const testdefou = {
    async testasync(){
        console.log("test console : ",await controller.usersController.getAll())
        }

}
testdefou.testasync();