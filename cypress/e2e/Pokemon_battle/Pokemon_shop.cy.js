describe('Покупка аватара на сайте pokemonbattle.ru', function () {

    it('Проверка авторизации', function () {
         cy.visit('https://pokemonbattle.ru/login'); // Зашли на сайт

         cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // Ввели верный логин
         cy.get('#password').type('USER_PASSWORD'); // Ввели верный пароль
         cy.get('.auth__button').click(); // Нажал войти

         cy.wait(2000);

         cy.url().should('eq', 'https://pokemonbattle.ru/'); // Зашли на главную страницу сайта
         cy.get('.header__container > .header__id').click(); // Нажали на кнопку своего тренера

         cy.wait(2000);

         cy.get('[href="/shop"]').click(); // Нажали на кнопку смена аватара

         cy.wait(2000);

         cy.get('.available > button').first().trigger('mouseover'); // Проверили эффект наведения
         cy.get('.available > button').first().click(); // Нажали на кнопку покупки первого активного аватара

         cy.wait(2000);

         cy.url().then((url) => 
            {expect(url).to.be.oneOf(['https://pokemonbattle.ru/payment/1', 'https://pokemonbattle.ru/payment/2']);}); // Зашли на страницу оплаты. В зависимости от того, первый или второй аватар будет куплен, меняется ссылка.
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('5555555555555557'); // Ввели номер карты
         cy.get('.pay__cardtypeimage').should('be.visible'); // проверяем, что лого типа карты видна пользователю
         cy.get(':nth-child(1) > .pay_base-input-v2').type('12/34'); //Вводим срок действия карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Вводим валидный CVV
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('KIGMINA EKATERINA'); // Вводим фамилию и имя
         cy.get('.pay-btn').click(); // нажали на кнопку оплатить
         cy.get('.payment__fielheader').contains('Подтверждение покупки'); // Проверили наличие надписи о подтверждении покупки
         cy.get('#cardnumber').type('56456'); // Ввели код из смс
         cy.get('.payment__submit-button').click(); // Нажали на кнопку отправить
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // ПРоверили подтверждающей покупку надписи
         cy.get('.payment__adv').click(); // Нажали на кнопку Вернутьсяв магазин

         cy.wait(2000);

         cy.url().should('eq', 'https://pokemonbattle.ru/shop'); // Вернулись на страницу выбора аватара
         cy.get('.header__container > .header__id').click(); // Нажали на кнопку своего тренера
         
     })
 }) 