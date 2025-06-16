div class="card card_full"
    card__image
    card__category
    card__title
    card__text
    card__price
    <button class="button">В корзину</button>

<div class="basket">
    modal__title
    <ul class="basket__list">
    #card card_compact
        basket__item-index
        card__title
        card__price
        <button class="basket__item-delete"
    <div class="modal__actions">
        <button class="button">Оформить
        basket__price

<form class="form">
    <div class="order">
        modal__title
            class="button button_alt">Онлайн
            class="button button_alt">При получении
        
            class="form__label modal__title">Адрес доставки
            class="form__input" type="text" placeholder="Введите адрес"
    <div class="modal__actions">
        <button disabled class="button">Далее</button>

#card-preview
	card__image
    card__category
    card__title
    card__text
    button card__button "В корзину"
    card__price

#card-basket
	basket__item-index
	card__title
	card__price
    basket__item-delete card__button "удалить"

#basket
	modal__title
	button basket__button "Оформить"
	basket__price

#order
#form-order
	modal__title
        order__buttons
			card "Онлайн"
			cash "При получении"
					</div>
	modal__title">Адрес доставки</span>
					<input name="address" class="form__input" type="text" placeholder="Введите адрес" />
				</label>
			</div>
			<div class="modal__actions">
				<button submit
				<span form__errors


#contacts
#form-contacts
			<div class="order">
				<label class="order__field">
					<span class="form__label modal__title">Email</span>
					<input name="email" class="form__input" type="text" placeholder="Введите Email" />
				</label>
				<label class="order__field">
					<span class="form__label modal__title">Телефон</span>
					<input name="phone" class="form__input" type="text" placeholder="+7 (" />
				</label>
			</div>
			<div class="modal__actions">
				<button type="submit" disabled class="button">Оплатить</button>
				<span class="form__errors"></span>
			</div>
		</form>
	</template>