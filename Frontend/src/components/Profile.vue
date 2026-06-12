<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card shadow border-0">
          <div class="card-header bg-primary text-white py-3">
            <h5 class="mb-0 fw-bold"><i class="bi bi-person-badge me-2"></i>Особистий кабінет</h5>
          </div>
          <div class="card-body p-4 p-md-5">
            
            <div class="row align-items-center mb-4 text-center text-md-start">
              <div class="col-md-3 mb-3 mb-md-0 text-center">
                <div class="bg-light text-secondary rounded-circle d-inline-flex align-items-center justify-content-center border border-3 border-primary shadow-sm" style="width: 120px; height: 120px;">
                  <i class="bi bi-person-fill" style="font-size: 70px;"></i>
                </div>
              </div>
              <div class="col-md-9">
                <h3 class="fw-bold mb-1">{{ user.name }}</h3>
                <p class="text-muted mb-2">{{ user.email }}</p>
                <span class="badge bg-success px-3 py-2"><i class="bi bi-shield-check me-1"></i> Акаунт активний</span>
              </div>
            </div>

            <hr class="my-4">

            <div class="row g-4">
              <div class="col-md-6">
                <h5 class="fw-bold text-secondary mb-3">Особисті дані</h5>
                <table class="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td class="text-muted small ps-0 align-middle" style="width: 45%;">Дата народження:</td>
                      <td class="text-dark fw-bold pe-0">{{ user.dob || 'Не вказано' }}</td>
                    </tr>
                    <tr>
                      <td class="text-muted small ps-0 align-middle">Стать:</td>
                      <td class="text-dark fw-bold pe-0">{{ user.gender || 'Не вказано' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <h5 class="fw-bold text-secondary mb-3">Статистика довідника</h5>
                <div class="p-3 bg-light rounded border border-dashed text-center">
                  <div class="row">
                    <div class="col-6 border-end">
                      <div class="fs-2 fw-bold text-primary">{{ stats.total }}</div>
                      <small class="text-muted">Контактів всього</small>
                    </div>
                    <div class="col-6">
                      <div class="fs-2 fw-bold text-success">{{ stats.groups }}</div>
                      <small class="text-muted">Груп за алфавітом</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 text-end d-flex flex-wrap gap-2 justify-content-end">
              <button class="btn btn-outline-primary fw-bold px-4" data-bs-toggle="modal" data-bs-target="#settingsModal">
                <i class="bi bi-gear me-2"></i>Налаштування
              </button>
              <button @click="logout" class="btn btn-danger fw-bold px-4">
                <i class="bi bi-box-arrow-left me-2"></i>Вийти
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="settingsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fw-bold"><i class="bi bi-gear-fill me-2"></i>Редагувати профіль</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" ref="closeSettingsModalBtn"></button>
          </div>
          <form @submit.prevent="updateProfile">
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label fw-bold small text-muted">Повне ім'я</label>
                <input v-model="editForm.name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold small text-muted">Дата народження</label>
                <input v-model="editForm.dob" type="date" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold small text-muted d-block">Стать</label>
                <div class="form-check form-check-inline">
                  <input v-model="editForm.gender" class="form-check-input" type="radio" value="Чоловіча" id="editGenderMale">
                  <label class="form-check-label" for="editGenderMale">Чоловіча</label>
                </div>
                <div class="form-check form-check-inline">
                  <input v-model="editForm.gender" class="form-check-input" type="radio" value="Жіноча" id="editGenderFemale">
                  <label class="form-check-label" for="editGenderFemale">Жіноча</label>
                </div>
              </div>
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">Скасувати</button>
              <button type="submit" class="btn btn-primary fw-bold">Зберегти зміни</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['navigate']);

const user = ref({ id: null, name: '', email: '', dob: '', gender: '' });
const editForm = ref({ name: '', dob: '', gender: '' });
const stats = ref({ total: 0, groups: 0 });

const closeSettingsModalBtn = ref(null);

const loadUser = () => {
  const stored = localStorage.getItem('user');
  if (stored) {
    const parsed = JSON.parse(stored);
    user.value = parsed;
    editForm.value = { ...parsed };
    fetchStats(parsed.id);
  } else {
    emit('navigate', 'login');
  }
};

const fetchStats = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/contacts?userId=${userId}`);
    const contacts = await res.json();
    stats.value.total = contacts.length;
    
    const letters = new Set();
    contacts.forEach(c => letters.add(c.fullName.charAt(0).toUpperCase()));
    stats.value.groups = letters.size;
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${user.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editForm.value.name,
        email: user.value.email,
        gender: editForm.value.gender,
        dob: editForm.value.dob
      })
    });
    
    if (res.ok) {
      const updatedUser = { ...user.value, ...editForm.value };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      user.value = updatedUser;
      closeSettingsModalBtn.value.click();
    }
  } catch (error) {
    console.error(error);
  }
};

const logout = () => {
  localStorage.removeItem('user');
  emit('navigate', 'login');
};

onMounted(() => {
  loadUser();
});
</script>

<style scoped>
</style>