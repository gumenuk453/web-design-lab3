export default class ContactModel {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
    }

    async getContacts(userId) {
        try {
            const response = await fetch(`${this.baseUrl}/contacts?userId=${userId}`);
            if (!response.ok) throw new Error('Помилка завантаження контактів');
            return await response.json();
        } catch (error) {
            console.error('Помилка Model (getContacts):', error);
            return [];
        }
    }

    async addContact(userId, fullName, phone1, phone2) {
        try {
            const response = await fetch(`${this.baseUrl}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, fullName, phone1, phone2 })
            });
            if (!response.ok) throw new Error('Помилка збереження контакту');
            return response.ok;
        } catch (error) {
            console.error('Помилка Model (addContact):', error);
            return false;
        }
    }

    async updateContact(id, contactData) {
        try {
            const response = await fetch(`${this.baseUrl}/contacts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });
            if (!response.ok) throw new Error('Помилка оновлення контакту');
            return response.ok;
        } catch (error) {
            console.error('Помилка Model (updateContact):', error);
            return false;
        }
    }

    async deleteContact(id) {
        try {
            const response = await fetch(`${this.baseUrl}/contacts/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Помилка видалення контакту');
            return true;
        } catch (error) {
            console.error('Помилка Model (deleteContact):', error);
            return false;
        }
    }
}