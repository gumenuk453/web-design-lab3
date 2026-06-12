<template>
  <main class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow border-0">
          <div class="card-body p-5">
            <div class="text-center mb-4">
              <div class="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                <i class="bi bi-person-plus fs-2"></i>
              </div>
              <h3 class="fw-bold">Створення акаунту</h3>
              <p class="text-muted">Заповніть форму, щоб почати користуватися довідником</p>
            </div>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label fw-semibold">Повне ім'я (ПІБ)</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-person"></i></span>
                  <input v-model="form.name" type="text" class="form-control" placeholder="Коваленко Андрій Миколайович" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Електронна пошта</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-envelope"></i></span>
                  <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Дата народження</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-calendar-event"></i></span>
                  <input v-model="form.dob" type="date" class="form-control" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold d-block">Стать</label>
                <div class="form-check form-check-inline">
                  <input v-model="form.gender" class="form-check-input" type="radio" value="Чоловіча" id="genderMale">
                  <label class="form-check-label" for="genderMale">Чоловіча</label>
                </div>
                <div class="form-check form-check-inline">
                  <input v-model="form.gender" class="form-check-input" type="radio" value="Жіноча" id="genderFemale">
                  <label class="form-check-label" for="genderFemale">Жіноча</label>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Пароль</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-lock"></i></span>
                  <input v-model="form.password" type="password" class="form-control" placeholder="Придумайте пароль" required>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Підтвердження паролю</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-lock-fill"></i></span>
                  <input v-model="confirmPassword" type="password" class="form-control" placeholder="Повторіть пароль" required>
                </div>
              </div>

              <div v-if="errorMessage" class="alert alert-danger py-2">{{ errorMessage }}</div>

              <div class="mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" required>
                  <label class="form-check-label text-muted small">Я погоджуюсь з умовами використання сервісу</label>
                </div>
              </div>

              <button type="submit" class="btn btn-success w-100 fw-bold py-2">
                Зареєструватися <i class="bi bi-check-circle ms-1"></i>
              </button>
            </form>

            <div class="text-center mt-4">
              <p class="text-muted small mb-0">Вже маєте акаунт? <a href="#" @click.prevent="$emit('navigate', 'login')" class="text-primary fw-bold text-decoration-none">Увійти</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['navigate']);

const form = ref({
  name: '',
  email: '',
  password: '',
  gender: 'Чоловіча',
  dob: ''
});
const confirmPassword = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  if (form.value.password !== confirmPassword.value) {
    errorMessage.value = 'Паролі не співпадають!';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      emit('navigate', 'index');
    } else {
      errorMessage.value = data.error || 'Помилка реєстрації';
    }
  } catch (error) {
    errorMessage.value = 'Помилка з\'єднання з сервером';
  }
};
</script>

<style scoped>
</style>