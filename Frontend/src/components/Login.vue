<template>
  <main class="container my-auto">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5 col-xl-4">
        <div class="card shadow border-0 mt-5 mb-5">
          <div class="card-body p-5">
            <div class="text-center mb-4">
              <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                <i class="bi bi-box-arrow-in-right fs-2"></i>
              </div>
              <h3 class="fw-bold">З поверненням!</h3>
              <p class="text-muted">Будь ласка, увійдіть до свого акаунту</p>
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label fw-semibold">Електронна пошта</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-envelope"></i></span>
                  <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Пароль</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-lock"></i></span>
                  <input v-model="password" type="password" class="form-control" placeholder="Введіть пароль" required>
                </div>
              </div>

              <div v-if="errorMessage" class="alert alert-danger py-2">{{ errorMessage }}</div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input v-model="rememberMe" class="form-check-input" type="checkbox" id="rememberMe">
                  <label class="form-check-label text-muted small" for="rememberMe">Запам'ятати мене</label>
                </div>
                <a href="#" @click.prevent="handleForgotPassword" class="text-decoration-none small">Забули пароль?</a>
              </div>

              <button type="submit" class="btn btn-primary w-100 fw-bold py-2">
                Увійти <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </form>

            <div class="text-center mt-4">
              <p class="text-muted small mb-0">Немає акаунту? <a href="#" @click.prevent="$emit('navigate', 'register')" class="text-primary fw-bold text-decoration-none">Зареєструватися</a></p>
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

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const rememberMe = ref(false);

const handleForgotPassword = () => {
  alert("Для відновлення пароля, будь ласка, зверніться до служби підтримки: support@mycontacts.com");
};

const handleLogin = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      
      if (rememberMe.value) {
        localStorage.setItem('remembered', 'true');
      } else {
        localStorage.removeItem('remembered');
      }

      emit('navigate', 'index');
    } else {
      errorMessage.value = data.error || 'Помилка входу';
    }
  } catch (error) {
    errorMessage.value = 'Помилка з\'єднання з сервером';
  }
};
</script>

<style scoped>
</style>
