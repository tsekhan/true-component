const {HtmlComponent, $, html, registerClass, Ref} = window.TC;

class ContactList extends HtmlComponent {
  static tag = 'contact-list';

  static template = html`<div class="ContactList"></div>`;

  add({firstName, lastName, phoneNumber}) {
    this.shadowRoot.querySelector('.ContactList').append(html`
      <div style="margin-bottom: 1em;">
        <span style="font-weight: bold;">${firstName} ${lastName}</span>
        <div>${phoneNumber}</div>
      </div>
    `)
  }

  constructor(params, children) {
    super(params, children);

    this.add({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1 (234) 567-890'
    });

    this.add({
      firstName: 'Mary',
      lastName: 'Jane',
      phoneNumber: '+9 (876) 543-210'
    });
  }
}

registerClass(ContactList);


class AddresseeForm extends HtmlComponent {
  static tag = 'addressee-form';

  constructor(params, children) {
    super(params, children);

    this.template = html`
      <h2>Add contact</h2>
      
      <div>First Name<div>
      <input class="AddresseeForm__firstName" />
      <br/><br/>
      
      <div>Last Name</div>
      <input class="AddresseeForm__lastName" />
      <br/><br/>
      
      <div>Phone Number</div>
      <input class="AddresseeForm__phoneNumber" />
      <br/><br/>
      
      <button class="AddresseeForm__addContact" type="submit">Add Contact</button>
    `;

    this
      .shadowRoot
      .querySelector('.AddresseeForm__addContact')
      .addEventListener('click', this.addContactHandler.bind(this));
  }

  addContactHandler() {
    const firstName = this.shadowRoot.querySelector('.AddresseeForm__firstName');
    const lastName = this.shadowRoot.querySelector('.AddresseeForm__lastName');
    const phoneNumber = this.shadowRoot.querySelector('.AddresseeForm__phoneNumber');

    this.contactList.add({
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
    });

    firstName.value = '';
    lastName.value = '';
    phoneNumber.value = '';
  }
}


class AddressBook extends HtmlComponent {
  static tag = 'address-book';

  constructor(params, children) {
    super(params, children);

    const contactList = new ContactList({
      style: 'display: table-cell; width: 300px;',
    });

    const addresseeForm = new AddresseeForm({
      style: 'display: table-cell;',
      contactList,
    });

    this.template = html`
      <div class="AddressBook">
        <h1>Address Book</h1>
        <div style="display: table; width: 100%;">
          ${contactList}
          ${addresseeForm}
        </div>
      </div>
    `;
  }
}
