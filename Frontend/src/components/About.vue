<template>
  <main class="container my-5">
    <div class="col-lg-8 mx-auto">
      <div class="text-center mb-5">
        <i class="bi bi-person-lines-fill text-primary" style="font-size: 80px;"></i>
        <h1 class="fw-bold mt-3">Про MyContacts</h1>
        <p class="lead text-muted">
          Твій надійний та зручний телефонний довідник для організації контактів
        </p>
      </div>

      <div class="accordion shadow-sm" id="aboutAccordion">
        <div class="accordion-item border-0 mb-2 shadow-sm rounded">
          <h2 class="accordion-header">
            <button class="accordion-button rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <strong>Що таке MyContacts? 📱</strong>
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#aboutAccordion">
            <div class="accordion-body bg-white rounded-bottom">
              <p><strong>MyContacts</strong> — це сучасний веб-додаток, створений для зручного зберігання та управління вашими телефонними контактами.</p>
              <p>Забудьте про загублені номери чи незручні паперові записники. Зберігайте всі необхідні дані в одному надійному місці.</p>
              
              <hr class="text-muted my-3">
              
              <p class="fw-bold text-secondary mb-3"><i class="bi bi-stars text-warning me-2"></i>Основні можливості:</p>
              <ul class="list-unstyled JSON-list">
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong>Повне керування:</strong> швидке додавання, вилучення та редагування абонентів (прізвище та кілька номерів телефону).
                  </div>
                </li>
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong>Розумна структуризація:</strong> автоматичне групування та сортування контактами за першою літерою для миттєвої навігації.
                  </div>
                </li>
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong>Живий пошук:</strong> миттєве знаходження потрібного абонента за його прізвищем або цифровим номером.
                  </div>
                </li>
                <li class="mb-2 d-flex align-items-start">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong>Універсальний доступ:</strong> повна оптимізація інтерфейсу для комфортної роботи як з ПК, так і зі смартфонів.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item border-0 mb-2 shadow-sm rounded">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              <strong>Як користуватися? 🧩</strong>
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
            <div class="accordion-body bg-white rounded-bottom">
              <p class="mb-3 text-secondary fw-semibold">Управління контактами просте та інтуїтивно зрозуміле:</p>
              <ul class="list-unstyled">
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-1-circle-fill text-primary me-3 fs-5 mt-1"></i>
                  <div>
                    <strong>Авторизація:</strong><br>
                    Зареєструйтесь або увійдіть, щоб створити свою персональну телефонну книгу.
                  </div>
                </li>
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-2-circle-fill text-primary me-3 fs-5 mt-1"></i>
                  <div>
                    <strong>Створення контакту:</strong><br>
                    Натисніть кнопку додавання, введіть прізвище абонента та додайте один або кілька телефонних номерів.
                  </div>
                </li>
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-3-circle-fill text-primary me-3 fs-5 mt-1"></i>
                  <div>
                    <strong>Перегляд та сортування:</strong><br>
                    На головній сторінці ви побачите всі ваші контакти, автоматично згруповані за алфавітом для зручної навігації.
                  </div>
                </li>
                <li class="mb-3 d-flex align-items-start">
                  <i class="bi bi-4-circle-fill text-primary me-3 fs-5 mt-1"></i>
                  <div>
                    <strong>Редагування:</strong><br>
                    У будь-який момент ви можете оновити номер телефону або видалити неактуальний контакт.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item border-0 shadow-sm rounded">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
              <strong>Які технології використано? 👨🏾‍💻</strong>
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
            <div class="accordion-body bg-white rounded-bottom p-4">
              <p class="text-muted mb-4">Проєкт реалізовано як сучасний повноцінний Fullstack-додаток із надійною архітектурою розподілу обов'язків.</p>

              <div class="row g-3 mb-4">
                <div class="col-md-6 col-xl-3">
                  <div class="card h-100 border-0 shadow-sm text-center p-3 transition-card" style="background-color: #f8f9fa;">
                    <div class="mb-2"><i class="bi bi-heart-fill text-success" style="font-size: 2.5rem;"></i></div>
                    <h6 class="fw-bold text-dark mb-1">Frontend</h6>
                    <p class="small text-muted mb-0">Vue 3 (Composition API) & Bootstrap 5.3 для адаптивного інтерфейсу</p>
                  </div>
                </div>

                <div class="col-md-6 col-xl-3">
                  <div class="card h-100 border-0 shadow-sm text-center p-3 transition-card" style="background-color: #f8f9fa;">
                    <div class="mb-2"><i class="bi bi-server text-primary" style="font-size: 2.5rem;"></i></div>
                    <h6 class="fw-bold text-dark mb-1">Backend</h6>
                    <p class="small text-muted mb-0">Node.js та Express сервер, що надає захищений REST API</p>
                  </div>
                </div>

                <div class="col-md-6 col-xl-3">
                  <div class="card h-100 border-0 shadow-sm text-center p-3 transition-card" style="background-color: #f8f9fa;">
                    <div class="mb-2"><i class="bi bi-database-fill text-warning" style="font-size: 2.5rem;"></i></div>
                    <h6 class="fw-bold text-dark mb-1">База даних</h6>
                    <p class="small text-muted mb-0">Реляційна БД SQLite 3 для надійного збереження даних користувачів</p>
                  </div>
                </div>

                <div class="col-md-6 col-xl-3">
                  <div class="card h-100 border-0 shadow-sm text-center p-3 transition-card" style="background-color: #f8f9fa;">
                    <div class="mb-2"><i class="bi bi-diagram-3-fill text-danger" style="font-size: 2.5rem;"></i></div>
                    <h6 class="fw-bold text-dark mb-1">Архітектура</h6>
                    <p class="small text-muted mb-0">Паттерн MVC (Model-View-Controller) для чистоти та масштабованості коду</p>
                  </div>
                </div>
              </div>

              <div class="alert alert-light border text-center text-muted small shadow-sm mb-0">
                Проєкт створено в середовищі <strong>Visual Studio Code</strong> в рамках лабораторної роботи з курсу "Web-дизайн"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
.transition-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.transition-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.08)!important;
}
</style>