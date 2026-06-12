import ContactModel from './model.js';

export default class ContactController {
    constructor() {
        this.model = new ContactModel();
    }

    async loadUserContacts(userId) {
        return await this.model.getContacts(userId);
    }

    async handleAddContact(userId, fullName, phone1, phone2) {
        return await this.model.addContact(userId, fullName, phone1, phone2);
    }

    async handleUpdateContact(id, contactData) {
        return await this.model.updateContact(id, contactData);
    }

    async handleDeleteContact(id) {
        return await this.model.deleteContact(id);
    }
}