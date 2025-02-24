import * as data from "../../helpers/default_data.json"
import * as main_page from "../../locators/main_page.json"
import * as result_page from "../../locators/result_page.json"
import * as recovery_password_page from "../../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {


    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашли на сайт
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // ПРоверяю, что кнопка "Забыли пароль" нужного цвета
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Проверяю, что крестик есть, и он виден для пользователя
          });

    it('Верный пароль и верный логин', function () {
         
         cy.get(main_page.email).type(data.login); // Ввели верный логин
         cy.get(main_page.password).type(data.password); // Ввели верный пароль
         cy.get(main_page.login_button).click(); // Нажал войти

         cy.wait(5000);

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю
         
     })

     it('Верный логин и неверный пароль', function () {
       

        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввели неверный пароль
        cy.get(main_page.login_button).click(); // Нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю
        
    })

    it('Логин без @', function () {
       

        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю
        
    })

    it('Неправильный логин', function () {
       

        cy.get(main_page.email).type('german@bolnikov.ru'); // Ввели логин с опечаткой
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю
        
    })

    it('Проверка восстановления пароля', function () {
       
        cy.get(main_page.forgot_pass_btn).click(); // Нажали кнопку "Забыли пароль"
        cy.get(recovery_password_page.email).type(data.login); // Ввели почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // Нажали на кнопку Отправить код


        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю, что после отправки вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю
        
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
       
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели логин с опечаткой
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно» и наличие кнопки крестик'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю
        
    })
 })
 





 //План
 //+Найти поле логин и ввести верный логин
 //+Найти поле пароль и ввести правильный пароль
 //+Найти кнопку войти и нажать на нее
 //Проверить, что авторизация прошла успешно: на странице успешной авторизации хочу проверить, что текст совпадает с правильным текстом
 