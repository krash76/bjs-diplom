"use strict";

  let login = new UserForm();
    
    login.loginFormCallback = (data) => ApiConnector.login(data, (loginResponse) => {
      if (loginResponse.success) {
        location.reload()
      } else {
        login.setLoginErrorMessage(loginResponse.data)
      }
    })

    login.registerFormCallback = (data) => ApiConnector.register(data, (registerResponse) => {
      if (registerResponse.success) {
        location.reload()
      } else {
        login.setRegisterErrorMessage(registerResponse.data)
      }
    })

