<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-lg-10 mx-auto">
        
        <div class="row g-3 mb-4 align-items-center">
          <div class="col-md-8">
            <div class="input-group shadow-sm">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
              <input v-model="searchQuery" type="text" class="form-control border-start-0 ps-0" placeholder="Пошук абонента за прізвищем...">
            </div>
          </div>
          <div class="col-md-4 text-md-end">
            <button class="btn btn-success w-100 shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#addContactModal">
              <i class="bi bi-person-plus-fill me-2"></i>Додати контакт
            </button>
          </div>
        </div>

        <div class="card shadow-sm border-0 mb-4">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0 fw-bold text-secondary"><i class="bi bi-person-lines-fill me-2 text-primary"></i>Список абонентів</h5>
          </div>
          <div class="card-body p-4">
            
            <div v-if="Object.keys(groupedContacts).length === 0" class="alert alert-light text-center">
              Абонентів не знайдено.
            </div>

            <div v-for="(group, letter) in groupedContacts" :key="letter" class="mb-4">
              <h5 class="text-primary border-bottom pb-2 mb-3 fw-bold">{{ letter }}</h5>
              <div class="list-group list-group-flush">
                <div v-for="contact in group" :key="contact.id" class="list-group-item d-flex justify-content-between align-items-center py-3 border-0 shadow-sm mb-2 rounded">
                  <div>
                    <div class="fw-bold fs-5 mb-1">{{ contact.fullName }}</div>
                    <div class="text-muted">
                      <i class="bi bi-telephone-fill me-2 small"></i>{{ contact.phone1 }}
                      <span v-if="contact.phone2" class="ms-3"><i class="bi bi-telephone me-2 small"></i>{{ contact.phone2 }}</span>
                    </div>
                  </div>
                  <div>
                    <button @click="prepareEdit(contact)" class="btn btn-outline-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editContactModal">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button @click="deleteContact(contact.id)" class="btn btn-outline-danger btn-sm">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <div class="modal fade" id="addContactModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title fw-bold"><i class="bi bi-person-plus-fill me-2"></i>Новий абонент</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" ref="closeAddModalBtn"></button>
          </div>
          <form @submit.prevent="addContact">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-semibold">Прізвище та ім'я</label>
                <input v-model="newContact.fullName" type="text" class="form-control" placeholder="Наприклад, Коваленко Андрій" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Основний номер телефону</label>
                <input v-model="newContact.phone1" type="tel" class="form-control" placeholder="+380" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Додатковий номер (необов'язково)</label>
                <input v-model="newContact.phone2" type="tel" class="form-control" placeholder="+380">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
              <button type="submit" class="btn btn-success">Зберегти</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editContactModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fw-bold"><i class="bi bi-pencil-square me-2"></i>Редагування абонента</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" ref="closeEditModalBtn"></button>
          </div>
          <form @submit.prevent="updateContact">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-semibold">Прізвище та ім'я</label>
                <input v-model="editData.fullName" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Основний номер телефону</label>
                <input v-model="editData.phone1" type="tel" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Додатковий номер</label>
                <input v-model="editData.phone2" type="tel" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
              <button type="submit" class="btn btn-primary">Оновити дані</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ContactController from '../controller.js';

const emit = defineEmits(['navigate']);

const controller = new ContactController();

const contacts = ref([]);
const searchQuery = ref('');
const newContact = ref({ fullName: '', phone1: '', phone2: '' });
const editData = ref({ id: null, fullName: '', phone1: '', phone2: '' });

const closeAddModalBtn = ref(null);
const closeEditModalBtn = ref(null);

const currentUserId = ref(null);

const fetchContacts = async () => {
  contacts.value = await controller.loadUserContacts(currentUserId.value);
};

const addContact = async () => {
  const success = await controller.handleAddContact(
    currentUserId.value,
    newContact.value.fullName,
    newContact.value.phone1,
    newContact.value.phone2
  );
  
  if (success) {
    await fetchContacts();
    newContact.value = { fullName: '', phone1: '', phone2: '' };
    closeAddModalBtn.value.click();
  }
};

const deleteContact = async (id) => {
  if (!confirm('Видалити контакт?')) return;
  const success = await controller.handleDeleteContact(id);
  if (success) await fetchContacts();
};

const prepareEdit = (contact) => {
  editData.value = { ...contact };
};

const updateContact = async () => {
  const success = await controller.handleUpdateContact(editData.value.id, editData.value);
  if (success) {
    await fetchContacts();
    closeEditModalBtn.value.click();
  }
};

const groupedContacts = computed(() => {
  let filtered = contacts.value.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));

  const groups = {};
  filtered.forEach(contact => {
    const letter = contact.fullName.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(contact);
  });
  return groups;
});

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    const user = JSON.parse(storedUser);
    currentUserId.value = user.id;
    fetchContacts();
  } else {
    emit('navigate', 'login');
  }
});
</script>

<style scoped>
</style>