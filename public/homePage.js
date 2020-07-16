"use strict";

let logoutBtn = new LogoutButton();

  logoutBtn.action = () => ApiConnector.logout((logoutResponse) => {
    if (logoutResponse.success) {
        location.reload()
    }
  })

  ApiConnector.current((currentResponse) => {
    if (currentResponse.success) {
       ProfileWidget.showProfile(currentResponse.data)
    }
  }) 


let tableBody = new RatesBoard();

  setInterval(ApiConnector.getStocks((getStocksResponse) => {
    if (getStocksResponse.success) {
      tableBody.clearTable();
      tableBody.fillTable(getStocksResponse.data)
    }
  }), 
  60000)

let addMoneyForm = new MoneyManager();

  addMoneyForm.addMoneyCallback = (data) => ApiConnector.addMoney( data, (addMoneyResponse) => {
    if (addMoneyResponse.success) {
      ProfileWidget.showProfile(addMoneyResponse.data);
      addMoneyForm.setMessage(false, 'счет успешно пополнен'); 
    } else {
      addMoneyForm.setMessage(true, addMoneyResponse.data); 
    }
 })

  addMoneyForm.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (convertMoneyResponse) => {
    if (convertMoneyResponse.success) {
      ProfileWidget.showProfile(convertMoneyResponse.data);
      addMoneyForm.setMessage(false, 'конвертация выполнена успешно'); 
    } else {
      addMoneyForm.setMessage(true, convertMoneyResponse.data); 
    }
  })

  addMoneyForm.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (transferMoneyResponse) => {
    if (transferMoneyResponse.success) {
      ProfileWidget.showProfile(transferMoneyResponse.data);
      addMoneyForm.setMessage(false, 'перевод валюты выполнен успешно'); 
    } else {
     addMoneyForm.setMessage(true, transferMoneyResponse.data); 
    }
 })


let favoritesTableBody = new FavoritesWidget();

  ApiConnector.getFavorites((getFavoritesResponse) => {
    if (getFavoritesResponse.success) {
      favoritesTableBody.clearTable();
      favoritesTableBody.fillTable(getFavoritesResponse.data);
      addMoneyForm.updateUsersList(getFavoritesResponse.data);
    }
  })

  favoritesTableBody.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (addUserResponse) => {
    if (addUserResponse.success) {
      favoritesTableBody.clearTable();
      favoritesTableBody.fillTable(addUserResponse.data);
      addMoneyForm.updateUsersList(addUserResponse.data);
      favoritesTableBody.setMessage(false, 'пользователь успешно удален'); 
    } else {
     addMoneyForm.setMessage(true, addUserResponse.data); 
    }
 })
 
  favoritesTableBody.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (removeUserResponse) => {
    if (removeUserResponse.success) {
      favoritesTableBody.clearTable();
      favoritesTableBody.fillTable(removeUserResponse.data);
      addMoneyForm.updateUsersList(removeUserResponse.data);
      favoritesTableBody.setMessage(false, 'пользователь успешно удален'); 
    } else {
     addMoneyForm.setMessage(true, removeUserResponse.data); 
    }
 })
