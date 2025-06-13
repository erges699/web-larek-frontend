export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const categories = new Map([
  ['софт-скил', 'soft'],
  ['другое', 'other'],
  ['дополнительное', 'additional'],
  ['кнопка', 'button'],
  ['хард-скил', 'hard']
]);

export const constraintsContacts = {
	email: {
		presence: { message: '^Поле не может быть пустым', allowEmpty: false },
		format: {
			pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
			message:
				'^Некорректный адрес эл.почты',
		},
	},
    phone: {
        presence: { message: '^Поле не может быть пустым', allowEmpty: false },
        format: {
			pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
			message:
				'^Некорректный номер телефона',
		},
    }
};

